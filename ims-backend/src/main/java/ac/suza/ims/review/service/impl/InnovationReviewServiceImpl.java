package ac.suza.ims.review.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.entity.InnovationStatusHistory;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.innovation.repository.InnovationStatusHistoryRepository;
import ac.suza.ims.review.dto.*;
import ac.suza.ims.review.entity.*;
import ac.suza.ims.review.mapper.InnovationReviewMapper;
import ac.suza.ims.review.repository.*;
import ac.suza.ims.review.service.InnovationReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InnovationReviewServiceImpl implements InnovationReviewService {

    private final InnovationReviewRepository reviewRepository;
    private final ReviewAssignmentRepository assignmentRepository;
    private final ReviewerRepository reviewerRepository;
    private final EvaluationCriteriaRepository criteriaRepository;
    private final EvaluationScoreRepository scoreRepository;
    private final ReviewCommentRepository commentRepository;
    private final InnovationRepository innovationRepository;
    private final InnovationStatusHistoryRepository statusHistoryRepository;
    private final InnovationReviewMapper reviewMapper;

    @Override
    @Transactional
    public ReviewResponse submitReview(SubmitReviewRequest request, UUID reviewerUserId) {
        log.info("Submitting review for assignment: {}", request.getAssignmentId());

        // Verify the reviewer
        Reviewer reviewer = reviewerRepository.findByUserId(reviewerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer profile not found for current user."));

        // Verify the assignment
        ReviewAssignment assignment = assignmentRepository.findById(request.getAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));

        // Ensure this reviewer owns this assignment
        if (!assignment.getReviewer().getId().equals(reviewer.getId())) {
            throw new BusinessException("You are not authorized to review this innovation.");
        }

        // Prevent re-reviewing a completed assignment
        if (assignment.getStatus() == AssignmentStatus.COMPLETED) {
            throw new BusinessException("This assignment has already been completed.");
        }

        // Check if a review already exists for this assignment
        if (reviewRepository.existsByAssignmentId(assignment.getId())) {
            throw new BusinessException("A review has already been submitted for this assignment.");
        }

        // Create the review
        InnovationReview review = InnovationReview.builder()
                .decision(request.getDecision())
                .overallScore(request.getOverallScore())
                .strengths(request.getStrengths())
                .weaknesses(request.getWeaknesses())
                .recommendations(request.getRecommendations())
                .remarks(request.getRemarks())
                .assignment(assignment)
                .status(ReviewStatus.COMPLETED)
                .build();

        InnovationReview savedReview = reviewRepository.save(review);

        // Save evaluation scores
        if (request.getScores() != null) {
            for (EvaluationScoreRequest scoreReq : request.getScores()) {
                EvaluationCriteria criteria = criteriaRepository.findById(scoreReq.getCriteriaId())
                        .orElseThrow(() -> new ResourceNotFoundException("Criteria not found: " + scoreReq.getCriteriaId()));

                // Validate score doesn't exceed maximum
                if (scoreReq.getScore() > criteria.getMaximumScore()) {
                    throw new BusinessException("Score " + scoreReq.getScore() + " exceeds maximum of " + criteria.getMaximumScore() + " for criteria: " + criteria.getName());
                }

                EvaluationScore score = EvaluationScore.builder()
                        .score(scoreReq.getScore())
                        .remarks(scoreReq.getRemarks())
                        .review(savedReview)
                        .criteria(criteria)
                        .build();
                scoreRepository.save(score);
            }
        }

        // Save review comments
        if (request.getComments() != null) {
            for (ReviewCommentRequest commentReq : request.getComments()) {
                ReviewComment comment = ReviewComment.builder()
                        .comment(commentReq.getComment())
                        .commentType(commentReq.getCommentType())
                        .review(savedReview)
                        .build();
                commentRepository.save(comment);
            }
        }

        // Mark assignment as completed
        assignment.setStatus(AssignmentStatus.COMPLETED);
        assignmentRepository.save(assignment);

        // Update innovation status based on decision and record history
        Innovation innovation = assignment.getInnovation();
        InnovationStatus previousStatus = innovation.getCurrentStatus();
        InnovationStatus newStatus = mapDecisionToStatus(request.getDecision());

        innovation.setCurrentStatus(newStatus);
        if (newStatus == InnovationStatus.APPROVED) {
            innovation.setApprovalDate(LocalDateTime.now());
        }
        innovationRepository.save(innovation);

        // Record in InnovationStatusHistory
        InnovationStatusHistory history = InnovationStatusHistory.builder()
                .innovation(innovation)
                .previousStatus(previousStatus)
                .currentStatus(newStatus)
                .remarks("Review decision: " + request.getDecision().name() + ". " + (request.getRemarks() != null ? request.getRemarks() : ""))
                .changedBy(reviewer.getUser())
                .build();
        statusHistoryRepository.save(history);

        return reviewMapper.toResponse(savedReview);
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewResponse getReviewById(UUID id) {
        log.info("Fetching review: {}", id);
        return reviewRepository.findById(id)
                .map(reviewMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByInnovation(UUID innovationId) {
        log.info("Fetching reviews for innovation: {}", innovationId);
        return reviewRepository.findByAssignmentInnovationId(innovationId).stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
    }

    private InnovationStatus mapDecisionToStatus(ReviewDecision decision) {
        return switch (decision) {
            case APPROVED -> InnovationStatus.APPROVED_BY_SCHOOL;
            case REJECTED -> InnovationStatus.REJECTED;
            case REVISION_REQUIRED -> InnovationStatus.REVISION_REQUIRED;
            case RECOMMEND_FOR_INCUBATION -> InnovationStatus.FORWARDED_TO_CENTRAL;
        };
    }
}

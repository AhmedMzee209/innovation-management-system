package ac.suza.ims.review.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.review.dto.AssignReviewerRequest;
import ac.suza.ims.review.dto.ReviewAssignmentResponse;
import ac.suza.ims.review.entity.ReviewAssignment;
import ac.suza.ims.review.entity.Reviewer;
import ac.suza.ims.review.mapper.ReviewAssignmentMapper;
import ac.suza.ims.review.repository.ReviewAssignmentRepository;
import ac.suza.ims.review.repository.ReviewerRepository;
import ac.suza.ims.review.service.ReviewAssignmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewAssignmentServiceImpl implements ReviewAssignmentService {

    private final ReviewAssignmentRepository assignmentRepository;
    private final ReviewerRepository reviewerRepository;
    private final InnovationRepository innovationRepository;
    private final UserRepository userRepository;
    private final ReviewAssignmentMapper assignmentMapper;

    @Override
    @Transactional
    public ReviewAssignmentResponse assignReviewer(AssignReviewerRequest request, UUID assignedById) {
        log.info("Assigning reviewer {} to innovation {}", request.getReviewerId(), request.getInnovationId());

        // Prevent duplicate assignment
        if (assignmentRepository.existsByInnovationIdAndReviewerId(request.getInnovationId(), request.getReviewerId())) {
            throw new BusinessException("This reviewer is already assigned to this innovation.");
        }

        Innovation innovation = innovationRepository.findById(request.getInnovationId())
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        // Only submitted or under-review innovations can have reviewers assigned
        if (innovation.getCurrentStatus() != InnovationStatus.SUBMITTED &&
            innovation.getCurrentStatus() != InnovationStatus.UNDER_REVIEW) {
            throw new BusinessException("Reviewers can only be assigned to submitted or under-review innovations.");
        }

        Reviewer reviewer = reviewerRepository.findById(request.getReviewerId())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));

        User assignedBy = userRepository.findById(assignedById)
                .orElseThrow(() -> new ResourceNotFoundException("Assigning user not found"));

        ReviewAssignment assignment = ReviewAssignment.builder()
                .innovation(innovation)
                .reviewer(reviewer)
                .deadline(request.getDeadline())
                .assignedBy(assignedBy)
                .build();

        // Move innovation to UNDER_REVIEW if it was just SUBMITTED
        if (innovation.getCurrentStatus() == InnovationStatus.SUBMITTED) {
            innovation.setCurrentStatus(InnovationStatus.UNDER_REVIEW);
            innovationRepository.save(innovation);
        }

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewAssignmentResponse> getAssignmentsByReviewer(UUID reviewerId) {
        log.info("Fetching assignments for reviewer: {}", reviewerId);
        return assignmentRepository.findByReviewerId(reviewerId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewAssignmentResponse> getAssignmentsByInnovation(UUID innovationId) {
        log.info("Fetching assignments for innovation: {}", innovationId);
        return assignmentRepository.findByInnovationId(innovationId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewAssignmentResponse> getMyAssignments(UUID userId) {
        log.info("Fetching assignments for user: {}", userId);
        return reviewerRepository.findByUserId(userId)
                .map(reviewer -> assignmentRepository.findByReviewerId(reviewer.getId()).stream()
                        .map(assignmentMapper::toResponse)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }
}

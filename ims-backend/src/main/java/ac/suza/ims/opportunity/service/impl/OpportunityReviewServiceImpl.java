package ac.suza.ims.opportunity.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.opportunity.dto.OpportunityReviewRequest;
import ac.suza.ims.opportunity.dto.OpportunityReviewResponse;
import ac.suza.ims.opportunity.entity.ApplicationStatus;
import ac.suza.ims.opportunity.entity.OpportunityApplication;
import ac.suza.ims.opportunity.entity.OpportunityReview;
import ac.suza.ims.opportunity.entity.ReviewDecision;
import ac.suza.ims.opportunity.mapper.OpportunityReviewMapper;
import ac.suza.ims.opportunity.repository.OpportunityApplicationRepository;
import ac.suza.ims.opportunity.repository.OpportunityReviewRepository;
import ac.suza.ims.opportunity.service.OpportunityReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityReviewServiceImpl implements OpportunityReviewService {

    private final OpportunityReviewRepository reviewRepository;
    private final OpportunityApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final OpportunityReviewMapper reviewMapper;

    @Override
    @Transactional
    public OpportunityReviewResponse reviewApplication(OpportunityReviewRequest request) {
        log.info("Reviewing opportunity application ID {} with decision {}", request.getApplicationId(), request.getDecision());

        OpportunityApplication application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + request.getApplicationId()));

        User reviewer = getCurrentUser();

        OpportunityReview review = OpportunityReview.builder()
                .application(application)
                .reviewer(reviewer)
                .reviewDate(LocalDate.now())
                .decision(request.getDecision())
                .remarks(request.getRemarks())
                .build();

        OpportunityReview savedReview = reviewRepository.save(review);

        // Update application status based on review decision
        if (request.getDecision() == ReviewDecision.APPROVE) {
            application.setStatus(ApplicationStatus.APPROVED);
            application.setDecisionDate(LocalDate.now());
        } else if (request.getDecision() == ReviewDecision.REJECT) {
            application.setStatus(ApplicationStatus.REJECTED);
            application.setDecisionDate(LocalDate.now());
        } else if (request.getDecision() == ReviewDecision.REVISION_REQUIRED) {
            application.setStatus(ApplicationStatus.UNDER_REVIEW);
        }
        applicationRepository.save(application);

        return reviewMapper.toResponse(savedReview);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunityReviewResponse> getReviewsByApplication(UUID applicationId) {
        log.info("Fetching reviews for application ID: {}", applicationId);
        return reviewRepository.findByApplicationId(applicationId).stream()
                .map(reviewMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElse(null);
    }
}

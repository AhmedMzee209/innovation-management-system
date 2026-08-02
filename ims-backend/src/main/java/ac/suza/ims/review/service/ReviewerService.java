package ac.suza.ims.review.service;

import ac.suza.ims.review.dto.CreateReviewerRequest;
import ac.suza.ims.review.dto.ReviewerResponse;

import java.util.List;
import java.util.UUID;

public interface ReviewerService {
    ReviewerResponse createReviewer(CreateReviewerRequest request);
    ReviewerResponse getReviewerById(UUID id);
    ReviewerResponse getReviewerByUserId(UUID userId);
    List<ReviewerResponse> getAllReviewers();
    List<ReviewerResponse> getActiveReviewers();
}

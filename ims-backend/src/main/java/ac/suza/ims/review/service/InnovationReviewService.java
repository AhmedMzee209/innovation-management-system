package ac.suza.ims.review.service;

import ac.suza.ims.review.dto.ReviewResponse;
import ac.suza.ims.review.dto.SubmitReviewRequest;

import java.util.List;
import java.util.UUID;

public interface InnovationReviewService {
    ReviewResponse submitReview(SubmitReviewRequest request, UUID reviewerUserId);
    ReviewResponse getReviewById(UUID id);
    List<ReviewResponse> getReviewsByInnovation(UUID innovationId);
}

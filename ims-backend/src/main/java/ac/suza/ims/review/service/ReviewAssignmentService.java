package ac.suza.ims.review.service;

import ac.suza.ims.review.dto.AssignReviewerRequest;
import ac.suza.ims.review.dto.ReviewAssignmentResponse;

import java.util.List;
import java.util.UUID;

public interface ReviewAssignmentService {
    ReviewAssignmentResponse assignReviewer(AssignReviewerRequest request, UUID assignedById);
    List<ReviewAssignmentResponse> getAssignmentsByReviewer(UUID reviewerId);
    List<ReviewAssignmentResponse> getAssignmentsByInnovation(UUID innovationId);
    List<ReviewAssignmentResponse> getMyAssignments(UUID userId);
}

package ac.suza.ims.review.repository;

import ac.suza.ims.review.entity.AssignmentStatus;
import ac.suza.ims.review.entity.ReviewAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewAssignmentRepository extends JpaRepository<ReviewAssignment, UUID> {
    List<ReviewAssignment> findByReviewerId(UUID reviewerId);
    List<ReviewAssignment> findByInnovationId(UUID innovationId);
    List<ReviewAssignment> findByReviewerIdAndStatus(UUID reviewerId, AssignmentStatus status);
    boolean existsByInnovationIdAndReviewerId(UUID innovationId, UUID reviewerId);
}

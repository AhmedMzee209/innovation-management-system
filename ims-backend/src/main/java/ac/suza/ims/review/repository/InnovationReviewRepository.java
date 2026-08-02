package ac.suza.ims.review.repository;

import ac.suza.ims.review.entity.InnovationReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InnovationReviewRepository extends JpaRepository<InnovationReview, UUID> {
    Optional<InnovationReview> findByAssignmentId(UUID assignmentId);
    List<InnovationReview> findByAssignmentInnovationId(UUID innovationId);
    boolean existsByAssignmentId(UUID assignmentId);
}

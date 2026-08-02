package ac.suza.ims.review.repository;

import ac.suza.ims.review.entity.EvaluationScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EvaluationScoreRepository extends JpaRepository<EvaluationScore, UUID> {
    List<EvaluationScore> findByReviewId(UUID reviewId);
    boolean existsByReviewIdAndCriteriaId(UUID reviewId, UUID criteriaId);
}

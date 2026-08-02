package ac.suza.ims.review.repository;

import ac.suza.ims.review.entity.EvaluationCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EvaluationCriteriaRepository extends JpaRepository<EvaluationCriteria, UUID> {
    Optional<EvaluationCriteria> findByName(String name);
    boolean existsByName(String name);
}

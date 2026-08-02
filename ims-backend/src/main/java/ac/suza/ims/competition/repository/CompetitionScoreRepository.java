package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.CompetitionScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompetitionScoreRepository extends JpaRepository<CompetitionScore, UUID> {

    List<CompetitionScore> findByEvaluationId(UUID evaluationId);
}

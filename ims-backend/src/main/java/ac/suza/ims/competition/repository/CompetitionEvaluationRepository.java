package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.CompetitionEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompetitionEvaluationRepository extends JpaRepository<CompetitionEvaluation, UUID> {

    List<CompetitionEvaluation> findByRegistrationId(UUID registrationId);

    List<CompetitionEvaluation> findByJudgeAssignmentId(UUID judgeAssignmentId);

    boolean existsByJudgeAssignmentIdAndRegistrationId(UUID judgeAssignmentId, UUID registrationId);
}

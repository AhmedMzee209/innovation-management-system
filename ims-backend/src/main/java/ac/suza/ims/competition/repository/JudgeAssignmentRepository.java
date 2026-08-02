package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.JudgeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JudgeAssignmentRepository extends JpaRepository<JudgeAssignment, UUID> {

    List<JudgeAssignment> findByCompetitionId(UUID competitionId);

    List<JudgeAssignment> findByJudgeId(UUID judgeId);

    boolean existsByCompetitionIdAndJudgeId(UUID competitionId, UUID judgeId);
}

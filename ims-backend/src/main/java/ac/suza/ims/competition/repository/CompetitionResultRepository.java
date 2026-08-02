package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.CompetitionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompetitionResultRepository extends JpaRepository<CompetitionResult, UUID> {

    List<CompetitionResult> findByCompetitionIdOrderByRankAsc(UUID competitionId);

    Optional<CompetitionResult> findByCompetitionIdAndStartupId(UUID competitionId, UUID startupId);

    boolean existsByCompetitionIdAndStartupId(UUID competitionId, UUID startupId);
}

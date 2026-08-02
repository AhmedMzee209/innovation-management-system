package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.Competition;
import ac.suza.ims.competition.entity.CompetitionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, UUID>, JpaSpecificationExecutor<Competition> {

    Optional<Competition> findByCompetitionCode(String competitionCode);

    boolean existsByCompetitionCode(String competitionCode);

    List<Competition> findByStatus(CompetitionStatus status);
}

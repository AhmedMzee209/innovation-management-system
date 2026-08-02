package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.CompetitionRegistration;
import ac.suza.ims.competition.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompetitionRegistrationRepository extends JpaRepository<CompetitionRegistration, UUID> {

    Optional<CompetitionRegistration> findByRegistrationNumber(String registrationNumber);

    List<CompetitionRegistration> findByCompetitionId(UUID competitionId);

    List<CompetitionRegistration> findByStartupId(UUID startupId);

    List<CompetitionRegistration> findByCompetitionIdAndStatus(UUID competitionId, RegistrationStatus status);

    boolean existsByCompetitionIdAndStartupId(UUID competitionId, UUID startupId);

    long countByCompetitionId(UUID competitionId);
}

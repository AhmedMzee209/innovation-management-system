package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.StartupTeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StartupTeamMemberRepository extends JpaRepository<StartupTeamMember, UUID> {

    List<StartupTeamMember> findByStartupId(UUID startupId);

    List<StartupTeamMember> findByUserId(UUID userId);

    Optional<StartupTeamMember> findByStartupIdAndUserId(UUID startupId, UUID userId);

    boolean existsByStartupIdAndUserId(UUID startupId, UUID userId);

    boolean existsByStartupIdAndIsFounderTrue(UUID startupId);
}

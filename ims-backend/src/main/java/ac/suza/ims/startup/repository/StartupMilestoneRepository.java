package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.MilestoneStatus;
import ac.suza.ims.startup.entity.StartupMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StartupMilestoneRepository extends JpaRepository<StartupMilestone, UUID> {

    List<StartupMilestone> findByStartupId(UUID startupId);

    List<StartupMilestone> findByStartupIdAndStatus(UUID startupId, MilestoneStatus status);
}

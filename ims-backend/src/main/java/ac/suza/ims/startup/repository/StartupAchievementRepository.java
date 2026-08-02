package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.AchievementCategory;
import ac.suza.ims.startup.entity.StartupAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StartupAchievementRepository extends JpaRepository<StartupAchievement, UUID> {

    List<StartupAchievement> findByStartupId(UUID startupId);

    List<StartupAchievement> findByStartupIdAndCategory(UUID startupId, AchievementCategory category);
}

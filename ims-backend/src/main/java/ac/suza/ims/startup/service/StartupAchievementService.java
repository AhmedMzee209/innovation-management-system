package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.StartupAchievementRequest;
import ac.suza.ims.startup.dto.StartupAchievementResponse;

import java.util.List;
import java.util.UUID;

public interface StartupAchievementService {

    StartupAchievementResponse addAchievement(UUID startupId, StartupAchievementRequest request);

    List<StartupAchievementResponse> getAchievements(UUID startupId);

    void deleteAchievement(UUID achievementId);
}

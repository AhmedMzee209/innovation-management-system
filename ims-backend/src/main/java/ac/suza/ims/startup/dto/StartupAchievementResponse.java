package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.AchievementCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupAchievementResponse {

    private UUID id;
    private String title;
    private String description;
    private LocalDate achievementDate;
    private AchievementCategory category;
}

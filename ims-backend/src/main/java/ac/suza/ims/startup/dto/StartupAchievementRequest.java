package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.AchievementCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupAchievementRequest {

    @NotBlank(message = "Achievement title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @NotNull(message = "Achievement date is mandatory")
    private LocalDate achievementDate;

    @NotNull(message = "Achievement category is mandatory")
    private AchievementCategory category;
}

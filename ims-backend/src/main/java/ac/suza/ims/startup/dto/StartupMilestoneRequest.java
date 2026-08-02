package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.MilestoneStatus;
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
public class StartupMilestoneRequest {

    @NotBlank(message = "Milestone title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @NotNull(message = "Target date is mandatory")
    private LocalDate targetDate;

    private LocalDate completionDate;
    private MilestoneStatus status;
}

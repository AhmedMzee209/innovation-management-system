package ac.suza.ims.funding.dto;

import ac.suza.ims.startup.entity.MilestoneStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class FundingMilestoneRequest {

    @NotNull(message = "Application ID is mandatory")
    private UUID applicationId;

    @NotBlank(message = "Milestone title is mandatory")
    private String title;

    private String description;

    @NotNull(message = "Target date is mandatory")
    private LocalDate targetDate;

    private MilestoneStatus status;

    @Min(0) @Max(100)
    private Integer progressPercentage;
}

package ac.suza.ims.funding.dto;

import ac.suza.ims.startup.entity.MilestoneStatus;
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
public class FundingMilestoneResponse {

    private UUID id;
    private UUID applicationId;
    private String title;
    private String description;
    private LocalDate targetDate;
    private LocalDate completionDate;
    private MilestoneStatus status;
    private Integer progressPercentage;
}

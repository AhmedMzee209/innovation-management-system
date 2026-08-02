package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.ActionPlanStatus;
import ac.suza.ims.mentorship.entity.PriorityLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class ActionPlanRequest {

    @NotNull(message = "Session ID is mandatory")
    private UUID sessionId;

    @NotBlank(message = "Action plan title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;
    private UUID assignedToUserId;

    @NotNull(message = "Target date is mandatory")
    private LocalDate targetDate;

    private LocalDate completionDate;
    private ActionPlanStatus status;
    private PriorityLevel priority;
}

package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.ActionPlanStatus;
import ac.suza.ims.mentorship.entity.PriorityLevel;
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
public class ActionPlanResponse {

    private UUID id;
    private UUID sessionId;
    private String title;
    private String description;
    private UUID assignedToUserId;
    private String assignedToName;
    private LocalDate targetDate;
    private LocalDate completionDate;
    private ActionPlanStatus status;
    private PriorityLevel priority;
}

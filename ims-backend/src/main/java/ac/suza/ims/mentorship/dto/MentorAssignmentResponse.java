package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.AssignmentStatus;
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
public class MentorAssignmentResponse {

    private UUID id;
    private UUID mentorId;
    private String mentorCode;
    private String mentorName;
    private UUID startupId;
    private String startupCode;
    private String startupName;
    private LocalDate assignmentDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private AssignmentStatus status;
    private String remarks;
    private String assignedByName;
}

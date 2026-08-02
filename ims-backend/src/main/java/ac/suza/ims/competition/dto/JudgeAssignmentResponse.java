package ac.suza.ims.competition.dto;

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
public class JudgeAssignmentResponse {

    private UUID id;
    private UUID competitionId;
    private String competitionTitle;
    private UUID judgeId;
    private String judgeCode;
    private String judgeName;
    private LocalDate assignmentDate;
    private String status;
}

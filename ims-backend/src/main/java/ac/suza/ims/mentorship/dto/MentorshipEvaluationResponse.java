package ac.suza.ims.mentorship.dto;

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
public class MentorshipEvaluationResponse {

    private UUID id;
    private UUID sessionId;
    private String sessionTitle;
    private Double communicationScore;
    private Double technicalScore;
    private Double businessScore;
    private Double leadershipScore;
    private Double overallScore;
    private String remarks;
    private LocalDate evaluationDate;
}

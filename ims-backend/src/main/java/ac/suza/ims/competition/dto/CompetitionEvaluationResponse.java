package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.EvaluationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionEvaluationResponse {

    private UUID id;
    private UUID judgeAssignmentId;
    private UUID registrationId;
    private String startupName;
    private LocalDate evaluationDate;
    private String remarks;
    private EvaluationStatus status;
    private List<ScoreResponseDto> scores;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreResponseDto {
        private UUID id;
        private String criteria;
        private Double score;
        private Double maximumScore;
        private String remarks;
    }
}

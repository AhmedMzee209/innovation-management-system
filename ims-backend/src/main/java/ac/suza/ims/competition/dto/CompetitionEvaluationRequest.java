package ac.suza.ims.competition.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionEvaluationRequest {

    @NotNull(message = "Judge assignment ID is mandatory")
    private UUID judgeAssignmentId;

    @NotNull(message = "Registration ID is mandatory")
    private UUID registrationId;

    private String remarks;

    private List<ScoreItemDto> scores;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreItemDto {
        @NotBlank(message = "Criteria is mandatory")
        private String criteria;

        @NotNull(message = "Score is mandatory")
        @DecimalMin("0.0")
        private Double score;

        @NotNull(message = "Maximum score is mandatory")
        @DecimalMin("0.1")
        private Double maximumScore;

        private String remarks;
    }
}

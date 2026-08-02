package ac.suza.ims.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EvaluationScoreResponse {
    private UUID id;
    private Double score;
    private String remarks;
    private UUID criteriaId;
    private String criteriaName;
    private Double criteriaMaximumScore;
    private Double criteriaWeight;
}

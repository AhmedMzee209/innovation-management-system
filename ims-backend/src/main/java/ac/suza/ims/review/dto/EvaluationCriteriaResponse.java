package ac.suza.ims.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EvaluationCriteriaResponse {
    private UUID id;
    private String name;
    private String description;
    private Double maximumScore;
    private Double weight;
}

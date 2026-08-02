package ac.suza.ims.review.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EvaluationCriteriaRequest {

    @NotBlank(message = "Criteria name is mandatory")
    @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @NotNull(message = "Maximum score is mandatory")
    @Min(value = 1, message = "Maximum score must be at least 1")
    private Double maximumScore;

    private Double weight;
}

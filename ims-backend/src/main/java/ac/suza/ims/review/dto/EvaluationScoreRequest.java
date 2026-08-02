package ac.suza.ims.review.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EvaluationScoreRequest {

    @NotNull(message = "Criteria ID is mandatory")
    private UUID criteriaId;

    @NotNull(message = "Score is mandatory")
    @Min(value = 0, message = "Score cannot be less than 0")
    private Double score;

    @Size(max = 500)
    private String remarks;
}

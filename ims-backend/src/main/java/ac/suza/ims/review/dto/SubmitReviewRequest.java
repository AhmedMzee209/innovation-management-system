package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.ReviewDecision;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SubmitReviewRequest {

    @NotNull(message = "Assignment ID is mandatory")
    private UUID assignmentId;

    @NotNull(message = "Review decision is mandatory")
    private ReviewDecision decision;

    @NotNull(message = "Overall score is mandatory")
    @Min(value = 0, message = "Score cannot be less than 0")
    @Max(value = 100, message = "Score cannot exceed 100")
    private Double overallScore;

    @Size(max = 2000)
    private String strengths;

    @Size(max = 2000)
    private String weaknesses;

    @Size(max = 2000)
    private String recommendations;

    @Size(max = 1000)
    private String remarks;

    private List<EvaluationScoreRequest> scores;
    private List<ReviewCommentRequest> comments;
}

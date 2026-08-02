package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.ReviewDecision;
import ac.suza.ims.review.entity.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReviewResponse {
    private UUID id;
    private ReviewDecision decision;
    private Double overallScore;
    private String strengths;
    private String weaknesses;
    private String recommendations;
    private String remarks;
    private LocalDateTime reviewDate;
    private ReviewStatus status;

    private ReviewAssignmentResponse assignment;
    private List<EvaluationScoreResponse> evaluationScores;
    private List<ReviewCommentResponse> comments;
}

package ac.suza.ims.review.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * InnovationReview is the core review record submitted by a Reviewer.
 * It maps 1:1 to a ReviewAssignment and carries the final decision.
 * Completed reviews are immutable (enforced at the service layer).
 */
@Entity
@Table(name = "innovation_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_reviews SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationReview extends BaseEntity {

    @NotNull(message = "Review decision is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ReviewDecision decision;

    @NotNull(message = "Overall score is mandatory")
    @Min(value = 0, message = "Score cannot be less than 0")
    @Max(value = 100, message = "Score cannot exceed 100")
    @Column(name = "overall_score", nullable = false)
    private Double overallScore;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    @Column(name = "review_date", nullable = false)
    @Builder.Default
    private LocalDateTime reviewDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    @Builder.Default
    private ReviewStatus status = ReviewStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    /**
     * 1:1 link to the assignment that spawned this review.
     * Business rule: review cannot exist without a valid assignment.
     */
    @NotNull(message = "Review assignment is mandatory")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assignment_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_review_assignment"))
    private ReviewAssignment assignment;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<EvaluationScore> evaluationScores = new ArrayList<>();

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ReviewComment> comments = new ArrayList<>();
}

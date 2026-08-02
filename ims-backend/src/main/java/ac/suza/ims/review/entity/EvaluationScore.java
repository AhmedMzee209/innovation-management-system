package ac.suza.ims.review.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

/**
 * EvaluationScore records the score a reviewer gives to a specific criterion.
 * Business rule: score cannot exceed the criteria's maximumScore (enforced at service layer).
 */
@Entity
@Table(name = "evaluation_scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE evaluation_scores SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class EvaluationScore extends BaseEntity {

    @NotNull(message = "Score is mandatory")
    @Min(value = 0, message = "Score cannot be less than 0")
    @Column(nullable = false)
    private Double score;

    @Size(max = 500)
    @Column(length = 500)
    private String remarks;

    @NotNull(message = "Review is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "review_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_eval_score_review"))
    private InnovationReview review;

    @NotNull(message = "Evaluation criteria is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "criteria_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_eval_score_criteria"))
    private EvaluationCriteria criteria;
}

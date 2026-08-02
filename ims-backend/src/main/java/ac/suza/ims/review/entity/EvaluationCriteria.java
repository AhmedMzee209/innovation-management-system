package ac.suza.ims.review.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

/**
 * EvaluationCriteria defines the rubric used to score an innovation.
 * Each criterion has a maximum score and a weight for weighted average scoring.
 * Examples: Innovation, Feasibility, Impact, Market Potential, Technical Quality.
 */
@Entity
@Table(name = "evaluation_criteria",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_eval_criteria_name", columnNames = "name")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE evaluation_criteria SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class EvaluationCriteria extends BaseEntity {

    @NotBlank(message = "Criteria name is mandatory")
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @NotNull(message = "Maximum score is mandatory")
    @Min(value = 1, message = "Maximum score must be at least 1")
    @Column(name = "maximum_score", nullable = false)
    private Double maximumScore;

    /**
     * Weight (0.0 – 1.0) for weighted average scoring across criteria.
     */
    @Column(nullable = false)
    @Builder.Default
    private Double weight = 1.0;
}

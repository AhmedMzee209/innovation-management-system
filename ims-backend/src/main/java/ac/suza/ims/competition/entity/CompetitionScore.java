package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "competition_scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_scores SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class CompetitionScore extends BaseEntity {

    @NotBlank(message = "Criteria is mandatory")
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String criteria;

    @NotNull(message = "Score is mandatory")
    @DecimalMin(value = "0.0")
    @Column(nullable = false)
    private Double score;

    @NotNull(message = "Maximum score is mandatory")
    @DecimalMin(value = "0.1")
    @Column(name = "maximum_score", nullable = false)
    private Double maximumScore;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Relationships
    @NotNull(message = "Competition evaluation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "evaluation_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_score_evaluation"))
    private CompetitionEvaluation evaluation;
}

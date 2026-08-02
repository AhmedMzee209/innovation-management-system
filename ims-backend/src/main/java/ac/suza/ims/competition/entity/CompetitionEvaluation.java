package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "competition_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_evaluations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class CompetitionEvaluation extends BaseEntity {

    @NotNull(message = "Evaluation date is mandatory")
    @Column(name = "evaluation_date", nullable = false)
    @Builder.Default
    private LocalDate evaluationDate = LocalDate.now();

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private EvaluationStatus status = EvaluationStatus.PENDING;

    // Relationships
    @NotNull(message = "Judge assignment is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "judge_assignment_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_eval_judge_assignment"))
    private JudgeAssignment judgeAssignment;

    @NotNull(message = "Registration is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "registration_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_eval_registration"))
    private CompetitionRegistration registration;
}

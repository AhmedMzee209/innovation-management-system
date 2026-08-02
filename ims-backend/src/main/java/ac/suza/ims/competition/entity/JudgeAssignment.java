package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "judge_assignments",
        indexes = {
                @Index(name = "idx_judge_assign_comp_judge", columnList = "competition_id, judge_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE judge_assignments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class JudgeAssignment extends BaseEntity {

    @NotNull(message = "Assignment date is mandatory")
    @Column(name = "assignment_date", nullable = false)
    @Builder.Default
    private LocalDate assignmentDate = LocalDate.now();

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    // Relationships
    @NotNull(message = "Competition is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "competition_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_judge_assign_competition"))
    private Competition competition;

    @NotNull(message = "Judge is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "judge_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_judge_assign_judge"))
    private Judge judge;
}

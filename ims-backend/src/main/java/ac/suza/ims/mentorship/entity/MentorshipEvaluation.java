package ac.suza.ims.mentorship.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "mentorship_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mentorship_evaluations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class MentorshipEvaluation extends BaseEntity {

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    @Column(name = "communication_score")
    private Double communicationScore;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    @Column(name = "technical_score")
    private Double technicalScore;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    @Column(name = "business_score")
    private Double businessScore;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    @Column(name = "leadership_score")
    private Double leadershipScore;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    @Column(name = "overall_score")
    private Double overallScore;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @NotNull(message = "Evaluation date is mandatory")
    @Column(name = "evaluation_date", nullable = false)
    @Builder.Default
    private LocalDate evaluationDate = LocalDate.now();

    // Relationships
    @NotNull(message = "Mentorship session is mandatory")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_evaluation_session"))
    private MentorshipSession session;
}

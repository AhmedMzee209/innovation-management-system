package ac.suza.ims.mentorship.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "mentor_feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mentor_feedbacks SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class MentorFeedback extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    @Column(name = "overall_remarks", columnDefinition = "TEXT")
    private String overallRemarks;

    @NotNull(message = "Feedback date is mandatory")
    @Column(name = "feedback_date", nullable = false)
    @Builder.Default
    private LocalDate feedbackDate = LocalDate.now();

    // Relationships
    @NotNull(message = "Mentorship session is mandatory")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_feedback_session"))
    private MentorshipSession session;
}

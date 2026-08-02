package ac.suza.ims.mentorship.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "mentor_assignments",
        indexes = {
                @Index(name = "idx_mentor_assignment_status", columnList = "mentor_id, startup_id, status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mentor_assignments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class MentorAssignment extends BaseEntity {

    @NotNull(message = "Assignment date is mandatory")
    @Column(name = "assignment_date", nullable = false)
    @Builder.Default
    private LocalDate assignmentDate = LocalDate.now();

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private AssignmentStatus status = AssignmentStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Relationships
    @NotNull(message = "Mentor is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "mentor_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_mentor"))
    private Mentor mentor;

    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_startup"))
    private Startup startup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_by_user_id", foreignKey = @ForeignKey(name = "fk_assignment_assigned_by"))
    private User assignedBy;
}

package ac.suza.ims.review.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.innovation.entity.Innovation;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

/**
 * ReviewAssignment bridges an Innovation and a Reviewer.
 * An assignment must exist before a review can be submitted.
 */
@Entity
@Table(name = "review_assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE review_assignments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ReviewAssignment extends BaseEntity {

    @Column(name = "assignment_date", nullable = false)
    @Builder.Default
    private LocalDate assignmentDate = LocalDate.now();

    @FutureOrPresent(message = "Deadline must be today or in the future")
    @Column(name = "deadline")
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private AssignmentStatus status = AssignmentStatus.PENDING;

    /**
     * The manager who created this assignment.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_by_id",
            foreignKey = @ForeignKey(name = "fk_assignment_assigned_by"))
    private User assignedBy;

    @NotNull(message = "Innovation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "innovation_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_innovation"))
    private Innovation innovation;

    @NotNull(message = "Reviewer is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reviewer_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_reviewer"))
    private Reviewer reviewer;
}

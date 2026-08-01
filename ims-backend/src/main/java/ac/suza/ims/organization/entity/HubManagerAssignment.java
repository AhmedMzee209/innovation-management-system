package ac.suza.ims.organization.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

/**
 * Enterprise HubManagerAssignment Entity.
 * Bridges InnovationHub and User. Tracks historical management assignments,
 * including start/end dates and an active flag to identify current managers.
 */
@Entity
@Table(name = "hub_manager_assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE hub_manager_assignments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class HubManagerAssignment extends BaseEntity {

    @NotNull(message = "Hub is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hub_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_hub"))
    private InnovationHub hub;

    @NotNull(message = "Manager (User) is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_assignment_user"))
    private User manager;

    @Size(max = 100, message = "Role title must not exceed 100 characters")
    @Column(name = "role_title", length = 100)
    private String roleTitle;

    @NotNull(message = "Start date is mandatory")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean active = true;
}

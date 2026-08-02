package ac.suza.ims.startup.entity;

import ac.suza.ims.auth.entity.User;
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
@Table(
        name = "startup_team_members",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_startup_user_member", columnNames = {"startup_id", "user_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE startup_team_members SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class StartupTeamMember extends BaseEntity {

    @NotNull(message = "Member role is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StartupMemberRole role;

    @NotNull(message = "Join date is mandatory")
    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "leave_date")
    private LocalDate leaveDate;

    @DecimalMin(value = "0.0", message = "Ownership percentage cannot be less than 0%")
    @DecimalMax(value = "100.0", message = "Ownership percentage cannot exceed 100%")
    @Column(name = "ownership_percentage")
    @Builder.Default
    private Double ownershipPercentage = 0.0;

    @Column(name = "is_founder", nullable = false)
    @Builder.Default
    private Boolean isFounder = false;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "ACTIVE";

    // Relationships
    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_member_startup"))
    private Startup startup;

    @NotNull(message = "User is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_member_user"))
    private User user;
}

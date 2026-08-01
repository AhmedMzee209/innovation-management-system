package ac.suza.ims.organization.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.Set;

/**
 * Enterprise InnovationHub Entity.
 * Represents an innovation hub/center belonging to a School.
 */
@Entity
@Table(
        name = "innovation_hubs",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_innovation_hubs_code", columnNames = "code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_hubs SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationHub extends BaseEntity {

    @NotBlank(message = "Hub code is mandatory")
    @Size(max = 50, message = "Hub code must not exceed 50 characters")
    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @NotBlank(message = "Hub name is mandatory")
    @Size(max = 150, message = "Hub name must not exceed 150 characters")
    @Column(nullable = false, length = 150)
    private String name;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(length = 1000)
    private String description;

    @Size(max = 1000, message = "Vision must not exceed 1000 characters")
    @Column(length = 1000)
    private String vision;

    @Size(max = 1000, message = "Mission must not exceed 1000 characters")
    @Column(length = 1000)
    private String mission;

    @Size(max = 255, message = "Office location must not exceed 255 characters")
    @Column(name = "office_location", length = 255)
    private String officeLocation;

    @Email(message = "Email should be valid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    @Column(length = 150)
    private String email;

    @Size(max = 50, message = "Phone number must not exceed 50 characters")
    @Column(length = 50)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private HubStatus status = HubStatus.ACTIVE;

    @NotNull(message = "School is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_hub_school"))
    private School school;

    @OneToMany(mappedBy = "hub", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<HubManagerAssignment> managerAssignments = new HashSet<>();
}

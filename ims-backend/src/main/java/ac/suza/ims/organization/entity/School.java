package ac.suza.ims.organization.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.Set;

/**
 * Enterprise School Entity.
 * Represents a top-level academic unit (e.g., School of Computing).
 */
@Entity
@Table(
        name = "schools",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_schools_code", columnNames = "code"),
                @UniqueConstraint(name = "uk_schools_name", columnNames = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE schools SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class School extends BaseEntity {

    @NotBlank(message = "School code is mandatory")
    @Size(max = 50, message = "School code must not exceed 50 characters")
    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @NotBlank(message = "School name is mandatory")
    @Size(max = 150, message = "School name must not exceed 150 characters")
    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Size(max = 50, message = "School short name must not exceed 50 characters")
    @Column(name = "short_name", length = 50)
    private String shortName;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(length = 1000)
    private String description;

    @Email(message = "Email should be valid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    @Column(length = 150)
    private String email;

    @Size(max = 50, message = "Phone number must not exceed 50 characters")
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Size(max = 255, message = "Website URL must not exceed 255 characters")
    @Column(length = 255)
    private String website;

    @Size(max = 500, message = "Physical address must not exceed 500 characters")
    @Column(name = "physical_address", length = 500)
    private String physicalAddress;

    @Size(max = 255, message = "Logo URL must not exceed 255 characters")
    @Column(length = 255)
    private String logo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private SchoolStatus status = SchoolStatus.ACTIVE;

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Department> departments = new HashSet<>();

    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<InnovationHub> innovationHubs = new HashSet<>();
}

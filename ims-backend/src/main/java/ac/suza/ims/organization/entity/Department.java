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

/**
 * Enterprise Department Entity.
 * Represents an academic department within a School.
 */
@Entity
@Table(
        name = "departments",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_departments_code", columnNames = "code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE departments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Department extends BaseEntity {

    @NotBlank(message = "Department code is mandatory")
    @Size(max = 50, message = "Department code must not exceed 50 characters")
    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @NotBlank(message = "Department name is mandatory")
    @Size(max = 150, message = "Department name must not exceed 150 characters")
    @Column(nullable = false, length = 150)
    private String name;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(length = 1000)
    private String description;

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
    private DepartmentStatus status = DepartmentStatus.ACTIVE;

    @NotNull(message = "School is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false, foreignKey = @ForeignKey(name = "fk_department_school"))
    private School school;
}

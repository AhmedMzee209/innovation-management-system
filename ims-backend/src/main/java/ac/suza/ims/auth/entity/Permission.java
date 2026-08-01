package ac.suza.ims.auth.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

/**
 * Enterprise Permission Entity for the Innovation Management System (IMS).
 * Represents fine-grained permissions (e.g., USER_CREATE, INNOVATION_APPROVE).
 */
@Entity
@Table(
        name = "permissions",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_permissions_name", columnNames = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE permissions SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Permission extends BaseEntity {

    @NotBlank(message = "Permission name is mandatory")
    @Size(max = 100, message = "Permission name must not exceed 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    @Column(length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ModuleType module;
}

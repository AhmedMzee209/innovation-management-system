package ac.suza.ims.innovation.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
        name = "innovation_categories",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_innovation_category_name", columnNames = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_categories SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationCategory extends BaseEntity {

    @NotBlank(message = "Category name is mandatory")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(length = 500)
    private String description;

    @Size(max = 50, message = "Icon must not exceed 50 characters")
    @Column(length = 50)
    private String icon;

    @Size(max = 20, message = "Color must not exceed 20 characters")
    @Column(length = 20)
    private String color;
}

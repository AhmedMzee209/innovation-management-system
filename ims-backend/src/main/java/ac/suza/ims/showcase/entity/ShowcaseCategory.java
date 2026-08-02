package ac.suza.ims.showcase.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "showcase_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE showcase_categories SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ShowcaseCategory extends BaseEntity {

    @NotBlank(message = "Category name is mandatory")
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @Size(max = 50)
    @Column(length = 50)
    private String icon;

    @Size(max = 20)
    @Column(length = 20)
    private String color;
}

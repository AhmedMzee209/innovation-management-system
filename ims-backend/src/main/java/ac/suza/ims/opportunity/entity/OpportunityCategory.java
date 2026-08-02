package ac.suza.ims.opportunity.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "opportunity_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunity_categories SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class OpportunityCategory extends BaseEntity {

    @NotBlank(message = "Category name is mandatory")
    @Size(max = 150)
    @Column(nullable = false, length = 150, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
}

package ac.suza.ims.document.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "document_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE document_categories SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DocumentCategory extends BaseEntity {

    @NotBlank(message = "Category name is mandatory")
    @Size(max = 150)
    @Column(nullable = false, length = 150, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
}

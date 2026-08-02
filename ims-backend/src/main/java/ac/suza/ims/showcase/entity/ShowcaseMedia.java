package ac.suza.ims.showcase.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "showcase_media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE showcase_media SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ShowcaseMedia extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, length = 20)
    private MediaType mediaType;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @NotBlank(message = "File name or URL is mandatory")
    @Size(max = 500)
    @Column(name = "file_name", nullable = false, length = 500)
    private String fileName;

    @Size(max = 500)
    @Column(name = "storage_path", length = 500)
    private String storagePath;

    @Size(max = 500)
    @Column(length = 500)
    private String thumbnail;

    @Column(name = "display_order")
    private Integer displayOrder;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showcase_item_id", foreignKey = @ForeignKey(name = "fk_media_showcase_item"))
    private ShowcaseItem showcaseItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_id", foreignKey = @ForeignKey(name = "fk_media_gallery"))
    private ShowcaseGallery gallery;
}

package ac.suza.ims.showcase.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "showcase_galleries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE showcase_galleries SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ShowcaseGallery extends BaseEntity {

    @NotBlank(message = "Gallery title is mandatory")
    @Size(max = 255)
    @Column(name = "gallery_title", nullable = false, length = 255)
    private String galleryTitle;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @Column(name = "display_order")
    private Integer displayOrder;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ShowcaseMedia> mediaList = new ArrayList<>();
}

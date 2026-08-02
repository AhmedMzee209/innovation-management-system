package ac.suza.ims.showcase.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "showcase_items",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_showcase_slug", columnNames = "slug"),
                @UniqueConstraint(name = "uk_showcase_code", columnNames = "showcase_code")
        },
        indexes = {
                @Index(name = "idx_showcase_slug", columnList = "slug"),
                @Index(name = "idx_showcase_status", columnList = "status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE showcase_items SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ShowcaseItem extends BaseEntity {

    @NotBlank(message = "Showcase code is mandatory")
    @Size(max = 50)
    @Column(name = "showcase_code", nullable = false, length = 50)
    private String showcaseCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @NotBlank(message = "Slug is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String slug;

    @NotBlank(message = "Summary is mandatory")
    @Size(max = 500)
    @Column(nullable = false, length = 500)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @Column(nullable = false)
    private boolean featured = false;

    @Builder.Default
    @Column(nullable = false)
    private boolean published = false;

    @Column(name = "published_date")
    private LocalDateTime publishedDate;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private ShowcaseStatus status = ShowcaseStatus.DRAFT;

    // SEO Fields
    @Size(max = 100)
    @Column(name = "seo_title", length = 100)
    private String seoTitle;

    @Size(max = 255)
    @Column(name = "seo_description", length = 255)
    private String seoDescription;

    @Size(max = 255)
    @Column(name = "seo_keywords", length = 255)
    private String seoKeywords;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_showcase_category"))
    private ShowcaseCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "innovation_id", foreignKey = @ForeignKey(name = "fk_showcase_innovation"))
    private Innovation innovation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "startup_id", foreignKey = @ForeignKey(name = "fk_showcase_startup"))
    private Startup startup;

    @OneToMany(mappedBy = "showcaseItem", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ShowcaseMedia> media = new ArrayList<>();
}

package ac.suza.ims.showcase.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "success_stories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE success_stories SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class SuccessStory extends BaseEntity {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Size(max = 500)
    @Column(length = 500)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String story;

    @Column(columnDefinition = "TEXT")
    private String achievement;

    @Size(max = 500)
    @Column(name = "featured_image", length = 500)
    private String featuredImage;

    @Column(name = "publish_date")
    private LocalDateTime publishDate;

    @Builder.Default
    @Column(nullable = false)
    private boolean featured = false;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "startup_id", foreignKey = @ForeignKey(name = "fk_success_story_startup"))
    private Startup startup;
}

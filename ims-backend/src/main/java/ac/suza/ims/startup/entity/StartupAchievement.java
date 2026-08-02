package ac.suza.ims.startup.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "startup_achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE startup_achievements SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class StartupAchievement extends BaseEntity {

    @NotBlank(message = "Achievement title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Achievement date is mandatory")
    @Column(name = "achievement_date", nullable = false)
    private LocalDate achievementDate;

    @NotNull(message = "Achievement category is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AchievementCategory category;

    // Relationships
    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_achievement_startup"))
    private Startup startup;
}

package ac.suza.ims.startup.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "startup_progress_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE startup_progress_records SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class StartupProgress extends BaseEntity {

    @NotNull(message = "Progress date is mandatory")
    @Column(name = "progress_date", nullable = false)
    @Builder.Default
    private LocalDate progressDate = LocalDate.now();

    @NotNull(message = "Progress percentage is mandatory")
    @DecimalMin(value = "0.0", message = "Progress percentage cannot be less than 0%")
    @DecimalMax(value = "100.0", message = "Progress percentage cannot exceed 100%")
    @Column(name = "progress_percentage", nullable = false)
    private Double progressPercentage;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String challenges;

    @Column(name = "next_steps", columnDefinition = "TEXT")
    private String nextSteps;

    // Relationships
    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_progress_startup"))
    private Startup startup;
}

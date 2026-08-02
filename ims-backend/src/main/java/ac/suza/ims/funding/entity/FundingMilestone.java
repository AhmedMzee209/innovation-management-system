package ac.suza.ims.funding.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.MilestoneStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "funding_milestones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_milestones SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingMilestone extends BaseEntity {

    @NotBlank(message = "Milestone title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Target date is mandatory")
    @Column(name = "target_date", nullable = false)
    private LocalDate targetDate;

    @Column(name = "completion_date")
    private LocalDate completionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private MilestoneStatus status = MilestoneStatus.PLANNED;

    @Min(value = 0, message = "Progress percentage cannot be less than 0")
    @Max(value = 100, message = "Progress percentage cannot exceed 100")
    @Column(name = "progress_percentage")
    @Builder.Default
    private Integer progressPercentage = 0;

    // Relationships
    @NotNull(message = "Funding application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_milestone_application"))
    private FundingApplication application;
}

package ac.suza.ims.opportunity.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "opportunity_applications",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_opportunity_app_number", columnNames = "application_number")
        },
        indexes = {
                @Index(name = "idx_opp_app_opp_startup", columnList = "opportunity_id, startup_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunity_applications SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class OpportunityApplication extends BaseEntity {

    @NotBlank(message = "Application number is mandatory")
    @Size(max = 50)
    @Column(name = "application_number", nullable = false, unique = true, length = 50)
    private String applicationNumber;

    @NotNull(message = "Application date is mandatory")
    @Column(name = "application_date", nullable = false)
    @Builder.Default
    private LocalDate applicationDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.SUBMITTED;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "decision_date")
    private LocalDate decisionDate;

    // Relationships
    @NotNull(message = "Opportunity is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "opportunity_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_opp_app_opportunity"))
    private Opportunity opportunity;

    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_opp_app_startup"))
    private Startup startup;
}

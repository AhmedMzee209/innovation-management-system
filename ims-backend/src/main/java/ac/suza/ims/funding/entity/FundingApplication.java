package ac.suza.ims.funding.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(
        name = "funding_applications",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_funding_app_number", columnNames = "application_number")
        },
        indexes = {
                @Index(name = "idx_funding_app_startup_program", columnList = "startup_id, program_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_applications SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingApplication extends BaseEntity {

    @NotBlank(message = "Application number is mandatory")
    @Size(max = 50)
    @Column(name = "application_number", nullable = false, unique = true, length = 50)
    private String applicationNumber;

    @NotNull(message = "Requested amount is mandatory")
    @DecimalMin(value = "0.01", message = "Requested amount must be greater than zero")
    @Column(name = "requested_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal requestedAmount;

    @Column(name = "approved_amount", precision = 15, scale = 2)
    private BigDecimal approvedAmount;

    @Column(name = "business_justification", columnDefinition = "TEXT")
    private String businessJustification;

    @Column(name = "expected_outcome", columnDefinition = "TEXT")
    private String expectedOutcome;

    @NotNull(message = "Submission date is mandatory")
    @Column(name = "submission_date", nullable = false)
    @Builder.Default
    private LocalDate submissionDate = LocalDate.now();

    @Column(name = "decision_date")
    private LocalDate decisionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private FundingApplicationStatus status = FundingApplicationStatus.SUBMITTED;

    // Relationships
    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_app_startup"))
    private Startup startup;

    @NotNull(message = "Funding program is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "program_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_app_program"))
    private FundingProgram program;
}

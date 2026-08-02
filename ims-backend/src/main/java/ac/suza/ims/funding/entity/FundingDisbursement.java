package ac.suza.ims.funding.entity;

import ac.suza.ims.common.entity.BaseEntity;
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
        name = "funding_disbursements",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_disbursement_number", columnNames = "disbursement_number")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_disbursements SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingDisbursement extends BaseEntity {

    @NotBlank(message = "Disbursement number is mandatory")
    @Size(max = 50)
    @Column(name = "disbursement_number", nullable = false, unique = true, length = 50)
    private String disbursementNumber;

    @NotNull(message = "Disbursement amount is mandatory")
    @DecimalMin(value = "0.01", message = "Disbursement amount must be greater than zero")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Disbursement date is mandatory")
    @Column(name = "disbursement_date", nullable = false)
    @Builder.Default
    private LocalDate disbursementDate = LocalDate.now();

    @Size(max = 100)
    @Column(name = "payment_method", length = 100)
    private String paymentMethod;

    @Size(max = 255)
    @Column(name = "transaction_reference", length = 255)
    private String transactionReference;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private DisbursementStatus status = DisbursementStatus.PENDING;

    // Relationships
    @NotNull(message = "Funding application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_disbursement_application"))
    private FundingApplication application;
}

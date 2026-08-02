package ac.suza.ims.funding.entity;

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
@Table(name = "funding_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_evaluations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingEvaluation extends BaseEntity {

    @DecimalMin(value = "0.0", message = "Technical score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Technical score cannot exceed 100")
    @Column(name = "technical_score")
    private Double technicalScore;

    @DecimalMin(value = "0.0", message = "Business score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Business score cannot exceed 100")
    @Column(name = "business_score")
    private Double businessScore;

    @DecimalMin(value = "0.0", message = "Financial score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Financial score cannot exceed 100")
    @Column(name = "financial_score")
    private Double financialScore;

    @DecimalMin(value = "0.0", message = "Innovation score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Innovation score cannot exceed 100")
    @Column(name = "innovation_score")
    private Double innovationScore;

    @DecimalMin(value = "0.0", message = "Overall score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Overall score cannot exceed 100")
    @Column(name = "overall_score")
    private Double overallScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private FundingRecommendation recommendation = FundingRecommendation.APPROVE;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @NotNull(message = "Evaluation date is mandatory")
    @Column(name = "evaluation_date", nullable = false)
    @Builder.Default
    private LocalDate evaluationDate = LocalDate.now();

    // Relationships
    @NotNull(message = "Funding application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_eval_application"))
    private FundingApplication application;

    @NotNull(message = "Committee member is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "committee_member_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_eval_committee_member"))
    private FundingCommitteeMember committeeMember;
}

package ac.suza.ims.funding.entity;

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
@Table(name = "funding_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_reports SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingReport extends BaseEntity {

    @NotBlank(message = "Report title is mandatory")
    @Size(max = 255)
    @Column(name = "report_title", nullable = false, length = 255)
    private String reportTitle;

    @Size(max = 100)
    @Column(name = "report_type", length = 100)
    private String reportType;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String achievements;

    @Column(columnDefinition = "TEXT")
    private String challenges;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    @NotNull(message = "Submission date is mandatory")
    @Column(name = "submission_date", nullable = false)
    @Builder.Default
    private LocalDate submissionDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private ReportStatus status = ReportStatus.PENDING;

    // Relationships
    @NotNull(message = "Funding application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_funding_report_application"))
    private FundingApplication application;
}

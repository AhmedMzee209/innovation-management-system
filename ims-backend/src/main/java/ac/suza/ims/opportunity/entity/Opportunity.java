package ac.suza.ims.opportunity.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "opportunities",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_opportunity_code", columnNames = "opportunity_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunities SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Opportunity extends BaseEntity {

    @NotBlank(message = "Opportunity code is mandatory")
    @Size(max = 50)
    @Column(name = "opportunity_code", nullable = false, unique = true, length = 50)
    private String opportunityCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Provider is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String provider;

    @Size(max = 100)
    @Column(length = 100)
    private String country;

    @Size(max = 100)
    @Column(length = 100)
    private String city;

    @Size(max = 255)
    @Column(length = 255)
    private String website;

    @Email
    @Size(max = 150)
    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Size(max = 500)
    @Column(name = "application_link", length = 500)
    private String applicationLink;

    @Column(name = "application_open_date")
    private LocalDate applicationOpenDate;

    @NotNull(message = "Application close date is mandatory")
    @Column(name = "application_close_date", nullable = false)
    private LocalDate applicationCloseDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "maximum_participants")
    private Integer maximumParticipants;

    @Enumerated(EnumType.STRING)
    @Column(name = "opportunity_type", nullable = false, length = 50)
    @Builder.Default
    private OpportunityType opportunityType = OpportunityType.INTERNAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private OpportunityStatus status = OpportunityStatus.DRAFT;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_opportunity_category"))
    private OpportunityCategory category;
}

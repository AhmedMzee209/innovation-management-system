package ac.suza.ims.opportunity.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "opportunity_eligibilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunity_eligibilities SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class OpportunityEligibility extends BaseEntity {

    @NotBlank(message = "Criterion is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String criterion;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Relationships
    @NotNull(message = "Opportunity is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "opportunity_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_opp_eligibility_opportunity"))
    private Opportunity opportunity;
}

package ac.suza.ims.opportunity.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "opportunity_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunity_reviews SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class OpportunityReview extends BaseEntity {

    @NotNull(message = "Review date is mandatory")
    @Column(name = "review_date", nullable = false)
    @Builder.Default
    private LocalDate reviewDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ReviewDecision decision;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", foreignKey = @ForeignKey(name = "fk_opp_review_reviewer"))
    private User reviewer;

    @NotNull(message = "Application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_opp_review_application"))
    private OpportunityApplication application;
}

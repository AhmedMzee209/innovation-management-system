package ac.suza.ims.dashboard.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "analytics_snapshots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE analytics_snapshots SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class AnalyticsSnapshot extends BaseEntity {

    @Column(name = "snapshot_date", nullable = false)
    @Builder.Default
    private LocalDate snapshotDate = LocalDate.now();

    @Column(name = "total_users", nullable = false)
    @Builder.Default
    private Long totalUsers = 0L;

    @Column(name = "total_innovations", nullable = false)
    @Builder.Default
    private Long totalInnovations = 0L;

    @Column(name = "approved_innovations", nullable = false)
    @Builder.Default
    private Long approvedInnovations = 0L;

    @Column(name = "total_startups", nullable = false)
    @Builder.Default
    private Long totalStartups = 0L;

    @Column(name = "active_mentors", nullable = false)
    @Builder.Default
    private Long activeMentors = 0L;

    @Column(name = "funded_startups", nullable = false)
    @Builder.Default
    private Long fundedStartups = 0L;

    @Column(name = "active_competitions", nullable = false)
    @Builder.Default
    private Long activeCompetitions = 0L;

    @Column(name = "open_opportunities", nullable = false)
    @Builder.Default
    private Long openOpportunities = 0L;
}

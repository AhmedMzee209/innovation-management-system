package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "competition_results",
        indexes = {
                @Index(name = "idx_comp_result_comp_startup", columnList = "competition_id, startup_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_results SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class CompetitionResult extends BaseEntity {

    @Column(name = "rank_position")
    private Integer rank;

    @Column(name = "total_score")
    private Double totalScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private ResultDecision decision = ResultDecision.PARTICIPANT;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "announcement_date")
    private LocalDate announcementDate;

    // Relationships
    @NotNull(message = "Competition is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "competition_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_result_competition"))
    private Competition competition;

    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_result_startup"))
    private Startup startup;
}

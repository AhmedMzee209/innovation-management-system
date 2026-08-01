package ac.suza.ims.innovation.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "innovation_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_status_history SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationStatusHistory extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_status", length = 50)
    private InnovationStatus previousStatus;

    @NotNull(message = "Current status is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", nullable = false, length = 50)
    private InnovationStatus currentStatus;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @NotNull(message = "Changed by user is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "changed_by_id", nullable = false, foreignKey = @ForeignKey(name = "fk_status_history_user"))
    private User changedBy;

    @Column(name = "changed_date", nullable = false)
    @Builder.Default
    private LocalDateTime changedDate = LocalDateTime.now();

    @NotNull(message = "Innovation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "innovation_id", nullable = false, foreignKey = @ForeignKey(name = "fk_status_history_innovation"))
    private Innovation innovation;
}

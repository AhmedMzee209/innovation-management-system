package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;

@Entity
@Table(name = "competition_prizes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_prizes SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Prize extends BaseEntity {

    @NotBlank(message = "Prize title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "prize_type", nullable = false, length = 50)
    @Builder.Default
    private PrizeType prizeType = PrizeType.CASH;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    @Size(max = 255)
    @Column(length = 255)
    private String sponsor;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competition_id",
            foreignKey = @ForeignKey(name = "fk_prize_competition"))
    private Competition competition;
}

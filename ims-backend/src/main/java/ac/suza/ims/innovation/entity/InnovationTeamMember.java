package ac.suza.ims.innovation.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "innovation_team_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_team_members SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationTeamMember extends BaseEntity {

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @Size(max = 100)
    @Column(length = 100)
    private String email;

    @NotBlank(message = "Role is mandatory")
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String role;

    @Column(name = "joined_date", nullable = false)
    @Builder.Default
    private LocalDateTime joinedDate = LocalDateTime.now();

    @NotNull(message = "Innovation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "innovation_id", nullable = false, foreignKey = @ForeignKey(name = "fk_team_member_innovation"))
    private Innovation innovation;
}

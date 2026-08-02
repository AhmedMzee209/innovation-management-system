package ac.suza.ims.funding.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
        name = "funding_committee_members",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_committee_member_user", columnNames = "user_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_committee_members SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingCommitteeMember extends BaseEntity {

    @Size(max = 100)
    @Column(name = "committee_role", length = 100)
    private String committeeRole;

    @Size(max = 255)
    @Column(length = 255)
    private String organization;

    @Size(max = 150)
    @Column(length = 150)
    private String designation;

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    // Relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true,
            foreignKey = @ForeignKey(name = "fk_committee_member_user"))
    private User user;
}

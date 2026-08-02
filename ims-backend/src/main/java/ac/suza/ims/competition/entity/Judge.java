package ac.suza.ims.competition.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
        name = "competition_judges",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_judge_code", columnNames = "judge_code"),
                @UniqueConstraint(name = "uk_judge_user", columnNames = "user_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_judges SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Judge extends BaseEntity {

    @NotBlank(message = "Judge code is mandatory")
    @Size(max = 50)
    @Column(name = "judge_code", nullable = false, unique = true, length = 50)
    private String judgeCode;

    @Size(max = 50)
    @Column(length = 50)
    private String title;

    @Size(max = 255)
    @Column(length = 255)
    private String organization;

    @Size(max = 150)
    @Column(length = 150)
    private String designation;

    @Size(max = 255)
    @Column(length = 255)
    private String specialization;

    @Email
    @Size(max = 150)
    @Column(length = 150)
    private String email;

    @Size(max = 50)
    @Column(length = 50)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private JudgeStatus status = JudgeStatus.ACTIVE;

    // Relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true,
            foreignKey = @ForeignKey(name = "fk_judge_user"))
    private User user;
}

package ac.suza.ims.mentorship.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
        name = "mentors",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_mentor_code", columnNames = "mentor_code"),
                @UniqueConstraint(name = "uk_mentor_user", columnNames = "user_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mentors SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Mentor extends BaseEntity {

    @NotBlank(message = "Mentor code is mandatory")
    @Size(max = 50)
    @Column(name = "mentor_code", nullable = false, unique = true, length = 50)
    private String mentorCode;

    @Size(max = 50)
    @Column(length = 50)
    private String title;

    @Size(max = 255)
    @Column(length = 255)
    private String organization;

    @Size(max = 150)
    @Column(length = 150)
    private String position;

    @Size(max = 150)
    @Column(length = 150)
    private String industry;

    @Size(max = 255)
    @Column(length = 255)
    private String specialization;

    @Column(columnDefinition = "TEXT")
    private String biography;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Size(max = 255)
    @Column(name = "linkedin_profile", length = 255)
    private String linkedinProfile;

    @Size(max = 255)
    @Column(length = 255)
    private String website;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private MentorStatus status = MentorStatus.ACTIVE;

    // Relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, foreignKey = @ForeignKey(name = "fk_mentor_user"))
    private User user;
}

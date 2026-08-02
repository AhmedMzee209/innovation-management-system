package ac.suza.ims.review.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

/**
 * Reviewer entity represents a staff member profile registered as an evaluator.
 * It links 1:1 to a User account for authentication purposes.
 */
@Entity
@Table(name = "reviewers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE reviewers SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Reviewer extends BaseEntity {

    @NotBlank(message = "Employee number is mandatory")
    @Size(max = 50)
    @Column(name = "employee_number", nullable = false, unique = true, length = 50)
    private String employeeNumber;

    @Size(max = 100)
    @Column(length = 100)
    private String designation;

    @Size(max = 255)
    @Column(length = 255)
    private String specialization;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private ReviewerStatus status = ReviewerStatus.ACTIVE;

    /**
     * 1:1 link to the User account for authentication.
     * A Reviewer must always correspond to a registered system User.
     */
    @NotNull(message = "User account is mandatory")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_reviewer_user"))
    private User user;

    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ReviewAssignment> assignments = new ArrayList<>();
}

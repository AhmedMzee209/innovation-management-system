package ac.suza.ims.review.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

/**
 * ReviewComment captures granular feedback attached to a specific review.
 * Comments are typed (GENERAL, STRENGTH, WEAKNESS, SUGGESTION) for structured analysis.
 */
@Entity
@Table(name = "review_comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE review_comments SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ReviewComment extends BaseEntity {

    @NotBlank(message = "Comment is mandatory")
    @Size(max = 2000)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;

    @NotNull(message = "Comment type is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "comment_type", nullable = false, length = 50)
    private CommentType commentType;

    @Column(name = "created_date", nullable = false)
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();

    @NotNull(message = "Review is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "review_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comment_review"))
    private InnovationReview review;
}

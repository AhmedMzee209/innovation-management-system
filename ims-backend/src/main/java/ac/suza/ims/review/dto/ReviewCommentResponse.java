package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.CommentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReviewCommentResponse {
    private UUID id;
    private String comment;
    private CommentType commentType;
    private LocalDateTime createdDate;
}

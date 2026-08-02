package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.CommentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReviewCommentRequest {

    @NotBlank(message = "Comment is mandatory")
    @Size(max = 2000)
    private String comment;

    @NotNull(message = "Comment type is mandatory")
    private CommentType commentType;
}

package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.ReviewCommentResponse;
import ac.suza.ims.review.entity.ReviewComment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ReviewCommentMapper {
    ReviewCommentResponse toResponse(ReviewComment comment);
}

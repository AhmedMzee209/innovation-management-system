package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.ReviewResponse;
import ac.suza.ims.review.entity.InnovationReview;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {ReviewAssignmentMapper.class, EvaluationScoreMapper.class, ReviewCommentMapper.class},
        builder = @Builder(disableBuilder = true))
public interface InnovationReviewMapper {
    ReviewResponse toResponse(InnovationReview review);
}

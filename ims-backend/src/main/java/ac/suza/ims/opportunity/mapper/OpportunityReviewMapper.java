package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityReviewResponse;
import ac.suza.ims.opportunity.entity.OpportunityReview;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityReviewMapper {

    @Mapping(target = "applicationId", source = "application.id")
    @Mapping(target = "applicationNumber", source = "application.applicationNumber")
    @Mapping(target = "reviewerId", source = "reviewer.id")
    @Mapping(target = "reviewerName", expression = "java(review.getReviewer() != null ? review.getReviewer().getFirstName() + ' ' + review.getReviewer().getLastName() : null)")
    OpportunityReviewResponse toResponse(OpportunityReview review);
}

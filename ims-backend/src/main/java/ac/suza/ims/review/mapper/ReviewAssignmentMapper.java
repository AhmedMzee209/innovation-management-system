package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.ReviewAssignmentResponse;
import ac.suza.ims.review.entity.ReviewAssignment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ReviewAssignmentMapper {

    @Mapping(target = "innovationId", source = "innovation.id")
    @Mapping(target = "innovationTitle", source = "innovation.title")
    @Mapping(target = "innovationCode", source = "innovation.innovationCode")
    @Mapping(target = "reviewerId", source = "reviewer.id")
    @Mapping(target = "reviewerName", expression = "java(assignment.getReviewer().getUser().getFirstName() + ' ' + assignment.getReviewer().getUser().getLastName())")
    @Mapping(target = "assignedById", source = "assignedBy.id")
    @Mapping(target = "assignedByName", expression = "java(assignment.getAssignedBy() != null ? assignment.getAssignedBy().getFirstName() + ' ' + assignment.getAssignedBy().getLastName() : null)")
    ReviewAssignmentResponse toResponse(ReviewAssignment assignment);
}

package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.CreateReviewerRequest;
import ac.suza.ims.review.dto.ReviewerResponse;
import ac.suza.ims.review.entity.Reviewer;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ReviewerMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userFullName", expression = "java(reviewer.getUser().getFirstName() + ' ' + reviewer.getUser().getLastName())")
    @Mapping(target = "userEmail", source = "user.email")
    ReviewerResponse toResponse(Reviewer reviewer);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assignments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Reviewer toEntity(CreateReviewerRequest request);
}

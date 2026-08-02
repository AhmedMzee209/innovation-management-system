package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.ActionPlanRequest;
import ac.suza.ims.mentorship.dto.ActionPlanResponse;
import ac.suza.ims.mentorship.entity.ActionPlan;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ActionPlanMapper {

    @Mapping(target = "sessionId", source = "session.id")
    @Mapping(target = "assignedToUserId", source = "assignedTo.id")
    @Mapping(target = "assignedToName", expression = "java(actionPlan.getAssignedTo() != null ? actionPlan.getAssignedTo().getFirstName() + ' ' + actionPlan.getAssignedTo().getLastName() : null)")
    ActionPlanResponse toResponse(ActionPlan actionPlan);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    ActionPlan toEntity(ActionPlanRequest request);
}

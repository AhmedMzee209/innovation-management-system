package ac.suza.ims.organization.mapper;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.organization.dto.HubManagerAssignmentResponse;
import ac.suza.ims.organization.entity.HubManagerAssignment;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {InnovationHubMapper.class},
        builder = @Builder(disableBuilder = true))
public interface HubManagerAssignmentMapper {

    @Mapping(target = "manager", source = "manager", qualifiedByName = "userToManagerSummary")
    HubManagerAssignmentResponse toResponse(HubManagerAssignment assignment);

    @Named("userToManagerSummary")
    default HubManagerAssignmentResponse.ManagerSummary userToManagerSummary(User user) {
        if (user == null) return null;
        return HubManagerAssignmentResponse.ManagerSummary.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}


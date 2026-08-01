package ac.suza.ims.organization.mapper;

import ac.suza.ims.organization.dto.InnovationHubRequest;
import ac.suza.ims.organization.dto.InnovationHubResponse;
import ac.suza.ims.organization.entity.InnovationHub;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {SchoolMapper.class},
        builder = @Builder(disableBuilder = true))
public interface InnovationHubMapper {

    InnovationHubResponse toResponse(InnovationHub hub);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "managerAssignments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    InnovationHub toEntity(InnovationHubRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "managerAssignments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(InnovationHubRequest request, @MappingTarget InnovationHub hub);
}

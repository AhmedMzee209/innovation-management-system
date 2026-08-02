package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.StartupMilestoneRequest;
import ac.suza.ims.startup.dto.StartupMilestoneResponse;
import ac.suza.ims.startup.entity.StartupMilestone;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface StartupMilestoneMapper {

    StartupMilestoneResponse toResponse(StartupMilestone milestone);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    StartupMilestone toEntity(StartupMilestoneRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(StartupMilestoneRequest request, @MappingTarget StartupMilestone milestone);
}

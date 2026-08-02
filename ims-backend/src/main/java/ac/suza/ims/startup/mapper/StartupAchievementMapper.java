package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.StartupAchievementRequest;
import ac.suza.ims.startup.dto.StartupAchievementResponse;
import ac.suza.ims.startup.entity.StartupAchievement;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface StartupAchievementMapper {

    StartupAchievementResponse toResponse(StartupAchievement achievement);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    StartupAchievement toEntity(StartupAchievementRequest request);
}

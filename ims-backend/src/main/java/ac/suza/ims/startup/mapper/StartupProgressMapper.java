package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.StartupProgressRequest;
import ac.suza.ims.startup.dto.StartupProgressResponse;
import ac.suza.ims.startup.entity.StartupProgress;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface StartupProgressMapper {

    StartupProgressResponse toResponse(StartupProgress progress);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    StartupProgress toEntity(StartupProgressRequest request);
}

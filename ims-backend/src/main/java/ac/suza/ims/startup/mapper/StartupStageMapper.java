package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.StartupStageResponse;
import ac.suza.ims.startup.entity.StartupStage;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface StartupStageMapper {

    StartupStageResponse toResponse(StartupStage stage);
}

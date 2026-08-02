package ac.suza.ims.dashboard.mapper;

import ac.suza.ims.dashboard.dto.SavedFilterResponse;
import ac.suza.ims.dashboard.entity.SavedFilter;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface SavedFilterMapper {

    @Mapping(target = "userId", source = "user.id")
    SavedFilterResponse toResponse(SavedFilter filter);
}

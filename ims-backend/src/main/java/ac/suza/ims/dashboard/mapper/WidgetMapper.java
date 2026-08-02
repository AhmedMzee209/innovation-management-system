package ac.suza.ims.dashboard.mapper;

import ac.suza.ims.dashboard.dto.WidgetResponse;
import ac.suza.ims.dashboard.entity.DashboardWidget;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface WidgetMapper {

    @Mapping(target = "data", ignore = true)
    WidgetResponse toResponse(DashboardWidget widget);
}

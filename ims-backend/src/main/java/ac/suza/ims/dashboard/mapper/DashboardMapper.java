package ac.suza.ims.dashboard.mapper;

import ac.suza.ims.dashboard.dto.DashboardResponse;
import ac.suza.ims.dashboard.entity.DashboardLayout;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DashboardMapper {

    @Mapping(target = "layoutId", source = "id")
    @Mapping(target = "widgets", ignore = true)
    @Mapping(target = "summaryStatistics", ignore = true)
    @Mapping(target = "recentActivities", ignore = true)
    DashboardResponse toResponse(DashboardLayout layout);
}

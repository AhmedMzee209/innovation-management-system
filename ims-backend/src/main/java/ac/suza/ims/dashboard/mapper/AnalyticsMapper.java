package ac.suza.ims.dashboard.mapper;

import ac.suza.ims.dashboard.dto.AnalyticsResponse;
import ac.suza.ims.dashboard.entity.AnalyticsSnapshot;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface AnalyticsMapper {

    AnalyticsResponse.SnapshotData toSnapshotData(AnalyticsSnapshot snapshot);
}

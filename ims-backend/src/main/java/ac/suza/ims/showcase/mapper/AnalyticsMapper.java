package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.dto.ShowcaseAnalyticsResponse;
import ac.suza.ims.showcase.entity.ShowcaseAnalytics;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnalyticsMapper {
    ShowcaseAnalyticsResponse toResponse(ShowcaseAnalytics entity);
}

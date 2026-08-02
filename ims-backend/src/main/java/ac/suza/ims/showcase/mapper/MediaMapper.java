package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.dto.MediaResponse;
import ac.suza.ims.showcase.entity.ShowcaseMedia;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MediaMapper {
    MediaResponse toResponse(ShowcaseMedia entity);
}

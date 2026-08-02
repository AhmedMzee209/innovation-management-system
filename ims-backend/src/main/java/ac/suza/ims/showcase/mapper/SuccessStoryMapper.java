package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.dto.SuccessStoryResponse;
import ac.suza.ims.showcase.entity.SuccessStory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SuccessStoryMapper {

    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    SuccessStoryResponse toResponse(SuccessStory entity);
}

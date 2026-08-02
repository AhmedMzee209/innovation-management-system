package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.dto.GalleryResponse;
import ac.suza.ims.showcase.entity.ShowcaseGallery;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MediaMapper.class})
public interface GalleryMapper {
    GalleryResponse toResponse(ShowcaseGallery entity);
}

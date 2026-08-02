package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.dto.CreateShowcaseRequest;
import ac.suza.ims.showcase.dto.ShowcaseResponse;
import ac.suza.ims.showcase.dto.ShowcaseSummaryResponse;
import ac.suza.ims.showcase.entity.ShowcaseItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MediaMapper.class})
public interface ShowcaseItemMapper {

    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryIcon", source = "category.icon")
    @Mapping(target = "categoryColor", source = "category.color")
    @Mapping(target = "innovationId", source = "innovation.id")
    @Mapping(target = "innovationCode", source = "innovation.innovationCode")
    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    ShowcaseResponse toResponse(ShowcaseItem entity);

    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "categoryColor", source = "category.color")
    @Mapping(target = "categoryIcon", source = "category.icon")
    @Mapping(target = "thumbnailUrl", expression = "java(entity.getMedia() != null && !entity.getMedia().isEmpty() ? entity.getMedia().get(0).getStoragePath() : null)")
    ShowcaseSummaryResponse toSummaryResponse(ShowcaseItem entity);

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "innovation", ignore = true)
    @Mapping(target = "startup", ignore = true)
    ShowcaseItem toEntity(CreateShowcaseRequest request);
}

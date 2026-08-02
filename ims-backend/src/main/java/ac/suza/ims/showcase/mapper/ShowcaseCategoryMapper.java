package ac.suza.ims.showcase.mapper;

import ac.suza.ims.showcase.entity.ShowcaseCategory;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ShowcaseCategoryMapper {
    // Basic mappings can be added here if DTOs are required
}

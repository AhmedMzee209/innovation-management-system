package ac.suza.ims.innovation.mapper;

import ac.suza.ims.innovation.dto.InnovationCategoryRequest;
import ac.suza.ims.innovation.dto.InnovationCategoryResponse;
import ac.suza.ims.innovation.entity.InnovationCategory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface InnovationCategoryMapper {

    InnovationCategoryResponse toResponse(InnovationCategory category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    InnovationCategory toEntity(InnovationCategoryRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(InnovationCategoryRequest request, @MappingTarget InnovationCategory category);
}

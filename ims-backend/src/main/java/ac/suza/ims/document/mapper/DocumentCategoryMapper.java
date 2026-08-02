package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentCategoryResponse;
import ac.suza.ims.document.entity.DocumentCategory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentCategoryMapper {

    DocumentCategoryResponse toResponse(DocumentCategory category);
}

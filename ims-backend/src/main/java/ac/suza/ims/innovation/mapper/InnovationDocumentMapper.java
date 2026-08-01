package ac.suza.ims.innovation.mapper;

import ac.suza.ims.innovation.dto.InnovationDocumentResponse;
import ac.suza.ims.innovation.entity.InnovationDocument;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface InnovationDocumentMapper {
    InnovationDocumentResponse toResponse(InnovationDocument document);
}

package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentVersionResponse;
import ac.suza.ims.document.entity.DocumentVersion;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentVersionMapper {

    @Mapping(target = "documentId", source = "document.id")
    @Mapping(target = "uploadedById", source = "uploadedBy.id")
    @Mapping(target = "uploadedByName", expression = "java(version.getUploadedBy() != null ? version.getUploadedBy().getFirstName() + ' ' + version.getUploadedBy().getLastName() : null)")
    DocumentVersionResponse toResponse(DocumentVersion version);
}

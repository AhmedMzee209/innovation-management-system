package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentAuditResponse;
import ac.suza.ims.document.entity.DocumentAudit;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentAuditMapper {

    @Mapping(target = "documentId", source = "document.id")
    @Mapping(target = "performedById", source = "performedBy.id")
    @Mapping(target = "performedByName", expression = "java(audit.getPerformedBy() != null ? audit.getPerformedBy().getFirstName() + ' ' + audit.getPerformedBy().getLastName() : null)")
    DocumentAuditResponse toResponse(DocumentAudit audit);
}

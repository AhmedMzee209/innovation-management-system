package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentResponse;
import ac.suza.ims.document.dto.DocumentSummaryResponse;
import ac.suza.ims.document.dto.UpdateDocumentRequest;
import ac.suza.ims.document.dto.UploadDocumentRequest;
import ac.suza.ims.document.entity.Document;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    DocumentResponse toResponse(Document document);

    @Mapping(target = "categoryName", source = "category.name")
    DocumentSummaryResponse toSummaryResponse(Document document);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "documentCode", ignore = true)
    @Mapping(target = "originalFileName", ignore = true)
    @Mapping(target = "storedFileName", ignore = true)
    @Mapping(target = "storagePath", ignore = true)
    @Mapping(target = "mimeType", ignore = true)
    @Mapping(target = "fileExtension", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    @Mapping(target = "checksum", ignore = true)
    @Mapping(target = "versionNumber", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "uploadDate", ignore = true)
    @Mapping(target = "approvedDate", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Document toEntity(UploadDocumentRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "documentCode", ignore = true)
    @Mapping(target = "originalFileName", ignore = true)
    @Mapping(target = "storedFileName", ignore = true)
    @Mapping(target = "storagePath", ignore = true)
    @Mapping(target = "mimeType", ignore = true)
    @Mapping(target = "fileExtension", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    @Mapping(target = "checksum", ignore = true)
    @Mapping(target = "versionNumber", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntityFromRequest(UpdateDocumentRequest request, @MappingTarget Document document);
}

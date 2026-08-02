package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentAccessResponse;
import ac.suza.ims.document.entity.DocumentAccess;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentAccessMapper {

    @Mapping(target = "documentId", source = "document.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(access.getUser() != null ? access.getUser().getFirstName() + ' ' + access.getUser().getLastName() : null)")
    DocumentAccessResponse toResponse(DocumentAccess access);
}

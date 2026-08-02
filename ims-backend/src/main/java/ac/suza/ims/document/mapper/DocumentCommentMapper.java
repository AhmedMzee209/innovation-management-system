package ac.suza.ims.document.mapper;

import ac.suza.ims.document.dto.DocumentCommentResponse;
import ac.suza.ims.document.entity.DocumentComment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface DocumentCommentMapper {

    @Mapping(target = "documentId", source = "document.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(comment.getUser() != null ? comment.getUser().getFirstName() + ' ' + comment.getUser().getLastName() : null)")
    DocumentCommentResponse toResponse(DocumentComment comment);
}

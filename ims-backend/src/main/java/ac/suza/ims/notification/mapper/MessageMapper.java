package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.MessageResponse;
import ac.suza.ims.notification.entity.Message;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MessageMapper {

    @Mapping(target = "conversationId", source = "conversation.id")
    @Mapping(target = "senderId", source = "sender.id")
    @Mapping(target = "senderName", expression = "java(message.getSender() != null ? message.getSender().getFirstName() + ' ' + message.getSender().getLastName() : null)")
    MessageResponse toResponse(Message message);
}

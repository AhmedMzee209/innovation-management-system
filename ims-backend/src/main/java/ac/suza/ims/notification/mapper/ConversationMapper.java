package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.ConversationResponse;
import ac.suza.ims.notification.entity.Conversation;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ConversationMapper {

    @Mapping(target = "participants", ignore = true)
    @Mapping(target = "lastMessage", ignore = true)
    ConversationResponse toResponse(Conversation conversation);
}

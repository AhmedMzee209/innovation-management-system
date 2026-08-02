package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.MessageRequest;
import ac.suza.ims.notification.dto.MessageResponse;

import java.util.List;
import java.util.UUID;

public interface MessagingService {

    MessageResponse sendMessage(MessageRequest request);

    List<MessageResponse> getMessagesByConversation(UUID conversationId);
}

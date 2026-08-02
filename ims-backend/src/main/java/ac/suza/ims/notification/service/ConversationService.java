package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.ConversationResponse;
import ac.suza.ims.notification.dto.CreateConversationRequest;

import java.util.List;
import java.util.UUID;

public interface ConversationService {

    ConversationResponse createConversation(CreateConversationRequest request);

    ConversationResponse getConversationById(UUID id);

    List<ConversationResponse> getCurrentUserConversations();
}

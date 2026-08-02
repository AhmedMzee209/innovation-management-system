package ac.suza.ims.notification.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.dto.MessageRequest;
import ac.suza.ims.notification.dto.MessageResponse;
import ac.suza.ims.notification.entity.Conversation;
import ac.suza.ims.notification.entity.Message;
import ac.suza.ims.notification.entity.MessageType;
import ac.suza.ims.notification.mapper.MessageMapper;
import ac.suza.ims.notification.repository.ConversationParticipantRepository;
import ac.suza.ims.notification.repository.ConversationRepository;
import ac.suza.ims.notification.repository.MessageRepository;
import ac.suza.ims.notification.service.MessagingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessagingServiceImpl implements MessagingService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;

    @Override
    @Transactional
    public MessageResponse sendMessage(MessageRequest request) {
        log.info("Sending message in conversation ID: {}", request.getConversationId());

        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with id: " + request.getConversationId()));

        User currentUser = getCurrentUser();

        // Business Rule: Only conversation participants can send messages
        if (!participantRepository.existsByConversationIdAndUserId(request.getConversationId(), currentUser.getId())) {
            throw new BusinessException("User is not a participant of this conversation.");
        }

        Message message = Message.builder()
                .conversation(conversation)
                .sender(currentUser)
                .message(request.getMessage())
                .messageType(request.getMessageType() != null ? request.getMessageType() : MessageType.TEXT)
                .sentAt(LocalDateTime.now())
                .attachmentCount(request.getAttachmentCount() != null ? request.getAttachmentCount() : 0)
                .build();

        return messageMapper.toResponse(messageRepository.save(message));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponse> getMessagesByConversation(UUID conversationId) {
        log.info("Fetching messages for conversation ID: {}", conversationId);

        User currentUser = getCurrentUser();
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, currentUser.getId())) {
            throw new BusinessException("User is not authorized to view messages in this conversation.");
        }

        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId).stream()
                .map(messageMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}

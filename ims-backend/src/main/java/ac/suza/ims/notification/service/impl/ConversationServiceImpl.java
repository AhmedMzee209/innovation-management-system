package ac.suza.ims.notification.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.dto.ConversationResponse;
import ac.suza.ims.notification.dto.CreateConversationRequest;
import ac.suza.ims.notification.entity.*;
import ac.suza.ims.notification.mapper.ConversationMapper;
import ac.suza.ims.notification.mapper.MessageMapper;
import ac.suza.ims.notification.repository.ConversationParticipantRepository;
import ac.suza.ims.notification.repository.ConversationRepository;
import ac.suza.ims.notification.repository.MessageRepository;
import ac.suza.ims.notification.service.ConversationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository participantRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ConversationMapper conversationMapper;
    private final MessageMapper messageMapper;

    @Override
    @Transactional
    public ConversationResponse createConversation(CreateConversationRequest request) {
        log.info("Creating conversation title: {}", request.getTitle());

        User currentUser = getCurrentUser();

        Conversation conversation = Conversation.builder()
                .conversationCode(generateConversationCode())
                .title(request.getTitle() != null ? request.getTitle() : "Direct Conversation")
                .conversationType(request.getConversationType() != null ? request.getConversationType() : ConversationType.DIRECT)
                .createdDate(LocalDate.now())
                .status("ACTIVE")
                .build();

        Conversation savedConversation = conversationRepository.save(conversation);

        // Add current user as participant if not present in recipient list
        List<UUID> participantIds = new ArrayList<>(request.getParticipantIds());
        if (!participantIds.contains(currentUser.getId())) {
            participantIds.add(currentUser.getId());
        }

        List<User> users = userRepository.findAllById(participantIds);
        for (User user : users) {
            ConversationParticipant participant = ConversationParticipant.builder()
                    .conversation(savedConversation)
                    .user(user)
                    .joinedDate(LocalDate.now())
                    .status("ACTIVE")
                    .build();
            participantRepository.save(participant);
        }

        // Add initial message if provided
        if (request.getInitialMessage() != null && !request.getInitialMessage().trim().isEmpty()) {
            Message message = Message.builder()
                    .conversation(savedConversation)
                    .sender(currentUser)
                    .message(request.getInitialMessage())
                    .messageType(MessageType.TEXT)
                    .sentAt(LocalDateTime.now())
                    .attachmentCount(0)
                    .build();
            messageRepository.save(message);
        }

        return buildConversationResponse(savedConversation);
    }

    @Override
    @Transactional(readOnly = true)
    public ConversationResponse getConversationById(UUID id) {
        log.info("Fetching conversation by ID: {}", id);
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with id: " + id));

        return buildConversationResponse(conversation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConversationResponse> getCurrentUserConversations() {
        User currentUser = getCurrentUser();
        log.info("Fetching conversations for user: {}", currentUser.getEmail());

        List<ConversationParticipant> participants = participantRepository.findByUserId(currentUser.getId());
        return participants.stream()
                .map(p -> buildConversationResponse(p.getConversation()))
                .collect(Collectors.toList());
    }

    private ConversationResponse buildConversationResponse(Conversation conversation) {
        ConversationResponse response = conversationMapper.toResponse(conversation);

        List<ConversationParticipant> participants = participantRepository.findByConversationId(conversation.getId());
        response.setParticipants(participants.stream()
                .map(p -> ConversationResponse.ParticipantResponse.builder()
                        .userId(p.getUser().getId())
                        .userName(p.getUser().getFirstName() + " " + p.getUser().getLastName())
                        .joinedDate(p.getJoinedDate())
                        .build())
                .collect(Collectors.toList()));

        List<Message> messages = messageRepository.findByConversationIdOrderBySentAtAsc(conversation.getId());
        if (!messages.isEmpty()) {
            response.setLastMessage(messageMapper.toResponse(messages.get(messages.size() - 1)));
        }

        return response;
    }

    private String generateConversationCode() {
        long count = conversationRepository.count() + 1;
        return String.format("CONV-%d-%04d", Year.now().getValue(), count);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}

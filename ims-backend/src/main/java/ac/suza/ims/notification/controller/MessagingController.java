package ac.suza.ims.notification.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.notification.dto.ConversationResponse;
import ac.suza.ims.notification.dto.CreateConversationRequest;
import ac.suza.ims.notification.dto.MessageRequest;
import ac.suza.ims.notification.dto.MessageResponse;
import ac.suza.ims.notification.service.ConversationService;
import ac.suza.ims.notification.service.MessagingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Messaging", description = "Endpoints for conversation threads and direct/group messaging")
public class MessagingController {

    private final ConversationService conversationService;
    private final MessagingService messagingService;

    @PostMapping("/conversations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Start a new conversation thread")
    public ResponseEntity<ApiResponse<ConversationResponse>> createConversation(@Valid @RequestBody CreateConversationRequest request) {
        ConversationResponse response = conversationService.createConversation(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Conversation started successfully", response));
    }

    @GetMapping("/conversations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get current user's conversations")
    public ResponseEntity<ApiResponse<List<ConversationResponse>>> getConversations() {
        List<ConversationResponse> response = conversationService.getCurrentUserConversations();
        return ResponseEntity.ok(ApiResponse.success("Conversations retrieved successfully", response));
    }

    @GetMapping("/conversations/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get conversation by ID")
    public ResponseEntity<ApiResponse<ConversationResponse>> getConversationById(@PathVariable UUID id) {
        ConversationResponse response = conversationService.getConversationById(id);
        return ResponseEntity.ok(ApiResponse.success("Conversation retrieved successfully", response));
    }

    @PostMapping("/messages")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Send a message within an existing conversation")
    public ResponseEntity<ApiResponse<MessageResponse>> sendMessage(@Valid @RequestBody MessageRequest request) {
        MessageResponse response = messagingService.sendMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Message sent successfully", response));
    }

    @GetMapping("/conversations/{id}/messages")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get message history for a conversation")
    public ResponseEntity<ApiResponse<List<MessageResponse>>> getMessages(@PathVariable UUID id) {
        List<MessageResponse> response = messagingService.getMessagesByConversation(id);
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved successfully", response));
    }
}

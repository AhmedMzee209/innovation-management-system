package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {

    private UUID id;
    private UUID conversationId;
    private String message;
    private MessageType messageType;
    private LocalDateTime sentAt;
    private LocalDateTime editedAt;
    private Integer attachmentCount;
    private UUID senderId;
    private String senderName;
}

package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.MessageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {

    @NotNull(message = "Conversation ID is mandatory")
    private UUID conversationId;

    @NotBlank(message = "Message content is mandatory")
    private String message;

    private MessageType messageType;
    private Integer attachmentCount;
}

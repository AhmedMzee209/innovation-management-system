package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.ConversationType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateConversationRequest {

    @Size(max = 255)
    private String title;

    private ConversationType conversationType;

    @NotEmpty(message = "Participant user IDs are required")
    private List<UUID> participantIds;

    private String initialMessage;
}

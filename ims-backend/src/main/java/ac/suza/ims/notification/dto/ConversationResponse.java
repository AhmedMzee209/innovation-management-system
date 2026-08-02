package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.ConversationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {

    private UUID id;
    private String conversationCode;
    private String title;
    private ConversationType conversationType;
    private LocalDate createdDate;
    private String status;
    private List<ParticipantResponse> participants;
    private MessageResponse lastMessage;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ParticipantResponse {
        private UUID userId;
        private String userName;
        private LocalDate joinedDate;
    }
}

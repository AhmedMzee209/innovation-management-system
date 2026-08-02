package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationTemplateResponse {

    private UUID id;
    private String templateCode;
    private String name;
    private String subject;
    private String body;
    private NotificationType notificationType;
    private Boolean active;
}

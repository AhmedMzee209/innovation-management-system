package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.DeliveryChannel;
import ac.suza.ims.notification.entity.NotificationPriority;
import ac.suza.ims.notification.entity.NotificationType;
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
public class NotificationResponse {

    private UUID userNotificationId;
    private UUID notificationId;
    private String notificationCode;
    private String title;
    private String message;
    private NotificationType notificationType;
    private NotificationPriority priority;
    private DeliveryChannel deliveryChannel;
    private Boolean read;
    private LocalDateTime readAt;
    private Boolean delivered;
    private LocalDateTime deliveredAt;
    private LocalDateTime sentAt;
}

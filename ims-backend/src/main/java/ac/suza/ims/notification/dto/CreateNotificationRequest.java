package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.DeliveryChannel;
import ac.suza.ims.notification.entity.NotificationPriority;
import ac.suza.ims.notification.entity.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "Message content is mandatory")
    private String message;

    private NotificationType notificationType;
    private NotificationPriority priority;
    private DeliveryChannel deliveryChannel;
    private LocalDateTime scheduledAt;
    private UUID templateId;

    @NotEmpty(message = "At least one recipient user ID is required")
    private List<UUID> recipientIds;
}

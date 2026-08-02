package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.AnnouncementStatus;
import ac.suza.ims.notification.entity.NotificationPriority;
import ac.suza.ims.notification.entity.TargetAudience;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementResponse {

    private UUID id;
    private String title;
    private String content;
    private TargetAudience targetAudience;
    private LocalDate publishDate;
    private LocalDate expiryDate;
    private NotificationPriority priority;
    private AnnouncementStatus status;
}

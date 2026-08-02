package ac.suza.ims.notification.dto;

import ac.suza.ims.notification.entity.NotificationPriority;
import ac.suza.ims.notification.entity.TargetAudience;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "Content is mandatory")
    private String content;

    private TargetAudience targetAudience;
    private LocalDate publishDate;
    private LocalDate expiryDate;
    private NotificationPriority priority;
}

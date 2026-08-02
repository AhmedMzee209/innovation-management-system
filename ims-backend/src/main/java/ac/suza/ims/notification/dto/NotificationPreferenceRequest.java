package ac.suza.ims.notification.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationPreferenceRequest {

    private Boolean emailEnabled;
    private Boolean smsEnabled;
    private Boolean inAppEnabled;
    private Boolean pushEnabled;

    @Size(max = 50)
    private String digestFrequency;
}

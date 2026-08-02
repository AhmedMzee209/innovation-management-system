package ac.suza.ims.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationPreferenceResponse {

    private UUID id;
    private UUID userId;
    private Boolean emailEnabled;
    private Boolean smsEnabled;
    private Boolean inAppEnabled;
    private Boolean pushEnabled;
    private String digestFrequency;
}

package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.NotificationPreferenceRequest;
import ac.suza.ims.notification.dto.NotificationPreferenceResponse;

public interface NotificationPreferenceService {

    NotificationPreferenceResponse getCurrentUserPreferences();

    NotificationPreferenceResponse updateCurrentUserPreferences(NotificationPreferenceRequest request);
}

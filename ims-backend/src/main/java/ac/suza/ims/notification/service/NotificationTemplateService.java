package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.NotificationTemplateResponse;

import java.util.List;
import java.util.UUID;

public interface NotificationTemplateService {

    NotificationTemplateResponse getTemplateById(UUID id);

    List<NotificationTemplateResponse> getAllTemplates();
}

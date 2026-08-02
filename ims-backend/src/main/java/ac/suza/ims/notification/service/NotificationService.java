package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.CreateNotificationRequest;
import ac.suza.ims.notification.dto.NotificationResponse;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    NotificationResponse sendNotification(CreateNotificationRequest request);

    List<NotificationResponse> getCurrentUserNotifications();

    List<NotificationResponse> getUnreadUserNotifications();

    long getUnreadCount();

    void markAsRead(UUID userNotificationId);

    void markAllAsRead();

    void deleteUserNotification(UUID userNotificationId);
}

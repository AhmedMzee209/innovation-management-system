package ac.suza.ims.notification.channel.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.notification.channel.NotificationChannelHandler;
import ac.suza.ims.notification.entity.DeliveryChannel;
import ac.suza.ims.notification.entity.Notification;
import ac.suza.ims.notification.entity.UserNotification;
import ac.suza.ims.notification.repository.UserNotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class InAppNotificationChannelHandler implements NotificationChannelHandler {

    private final UserNotificationRepository userNotificationRepository;

    @Override
    public boolean supports(DeliveryChannel channel) {
        return channel == DeliveryChannel.IN_APP;
    }

    @Override
    public void sendNotification(Notification notification, List<User> recipients) {
        log.info("Dispatching in-app notification '{}' to {} recipients", notification.getTitle(), recipients.size());
        for (User user : recipients) {
            UserNotification userNotification = UserNotification.builder()
                    .notification(notification)
                    .user(user)
                    .delivered(true)
                    .deliveredAt(LocalDateTime.now())
                    .read(false)
                    .build();
            userNotificationRepository.save(userNotification);
        }
    }
}

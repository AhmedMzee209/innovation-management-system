package ac.suza.ims.notification.channel;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.notification.entity.DeliveryChannel;
import ac.suza.ims.notification.entity.Notification;

import java.util.List;

public interface NotificationChannelHandler {

    boolean supports(DeliveryChannel channel);

    void sendNotification(Notification notification, List<User> recipients);
}

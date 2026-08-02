package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.NotificationResponse;
import ac.suza.ims.notification.entity.UserNotification;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface NotificationMapper {

    @Mapping(target = "userNotificationId", source = "id")
    @Mapping(target = "notificationId", source = "notification.id")
    @Mapping(target = "notificationCode", source = "notification.notificationCode")
    @Mapping(target = "title", source = "notification.title")
    @Mapping(target = "message", source = "notification.message")
    @Mapping(target = "notificationType", source = "notification.notificationType")
    @Mapping(target = "priority", source = "notification.priority")
    @Mapping(target = "deliveryChannel", source = "notification.deliveryChannel")
    @Mapping(target = "sentAt", source = "notification.sentAt")
    NotificationResponse toResponse(UserNotification userNotification);
}

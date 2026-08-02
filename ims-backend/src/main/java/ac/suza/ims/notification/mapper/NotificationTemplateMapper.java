package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.NotificationTemplateResponse;
import ac.suza.ims.notification.entity.NotificationTemplate;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface NotificationTemplateMapper {

    NotificationTemplateResponse toResponse(NotificationTemplate template);
}

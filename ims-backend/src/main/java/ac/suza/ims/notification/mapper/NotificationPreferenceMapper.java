package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.NotificationPreferenceResponse;
import ac.suza.ims.notification.entity.NotificationPreference;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface NotificationPreferenceMapper {

    @Mapping(target = "userId", source = "user.id")
    NotificationPreferenceResponse toResponse(NotificationPreference preference);
}

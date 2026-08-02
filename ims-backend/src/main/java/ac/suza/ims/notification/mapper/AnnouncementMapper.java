package ac.suza.ims.notification.mapper;

import ac.suza.ims.notification.dto.AnnouncementResponse;
import ac.suza.ims.notification.entity.Announcement;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface AnnouncementMapper {

    AnnouncementResponse toResponse(Announcement announcement);
}

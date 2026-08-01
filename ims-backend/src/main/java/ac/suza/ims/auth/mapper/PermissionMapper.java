package ac.suza.ims.auth.mapper;

import ac.suza.ims.auth.dto.PermissionResponse;
import ac.suza.ims.auth.entity.Permission;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, builder = @Builder(disableBuilder = true))
public interface PermissionMapper {

    PermissionResponse toResponse(Permission permission);
}

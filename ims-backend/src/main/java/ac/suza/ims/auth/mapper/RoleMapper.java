package ac.suza.ims.auth.mapper;

import ac.suza.ims.auth.dto.RoleResponse;
import ac.suza.ims.auth.entity.Role;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {PermissionMapper.class}, builder = @Builder(disableBuilder = true))
public interface RoleMapper {

    RoleResponse toResponse(Role role);
}

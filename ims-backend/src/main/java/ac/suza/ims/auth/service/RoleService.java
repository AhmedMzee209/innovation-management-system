package ac.suza.ims.auth.service;

import ac.suza.ims.auth.dto.RoleRequest;
import ac.suza.ims.auth.dto.RoleResponse;
import java.util.List;
import java.util.UUID;

public interface RoleService {
    List<RoleResponse> getAllRoles();
    RoleResponse getRoleById(UUID id);
    RoleResponse createRole(RoleRequest request);
    RoleResponse updateRole(UUID id, RoleRequest request);
    void deleteRole(UUID id);
}

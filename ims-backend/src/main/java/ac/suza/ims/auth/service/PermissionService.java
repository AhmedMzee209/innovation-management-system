package ac.suza.ims.auth.service;

import ac.suza.ims.auth.dto.PermissionResponse;
import java.util.List;
import java.util.UUID;

public interface PermissionService {
    List<PermissionResponse> getAllPermissions();
    PermissionResponse getPermissionById(UUID id);
}

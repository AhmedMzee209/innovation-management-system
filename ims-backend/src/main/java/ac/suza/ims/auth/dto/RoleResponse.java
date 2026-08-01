package ac.suza.ims.auth.dto;

import ac.suza.ims.auth.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse {

    private UUID id;
    
    private RoleType name;
    
    private String description;
    
    private boolean systemRole;
    
    private Set<PermissionResponse> permissions;
}

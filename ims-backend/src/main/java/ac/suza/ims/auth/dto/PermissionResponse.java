package ac.suza.ims.auth.dto;

import ac.suza.ims.auth.entity.ModuleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermissionResponse {

    private UUID id;
    
    private String name;
    
    private String description;
    
    private ModuleType module;
}

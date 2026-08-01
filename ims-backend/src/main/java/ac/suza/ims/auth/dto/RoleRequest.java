package ac.suza.ims.auth.dto;

import ac.suza.ims.auth.entity.RoleType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class RoleRequest {

    @NotNull(message = "Role name is mandatory")
    private RoleType name;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

    private Set<UUID> permissionIds;
}

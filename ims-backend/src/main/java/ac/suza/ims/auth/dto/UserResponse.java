package ac.suza.ims.auth.dto;

import ac.suza.ims.auth.entity.Gender;
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
public class UserResponse {

    private UUID id;

    private String firstName;
    
    private String middleName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private Gender gender;

    private String profilePhoto;

    private boolean enabled;
    
    private boolean emailVerified;

    private Set<RoleResponse> roles;
}

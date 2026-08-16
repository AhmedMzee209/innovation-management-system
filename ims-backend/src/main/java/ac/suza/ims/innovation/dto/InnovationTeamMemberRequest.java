package ac.suza.ims.innovation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InnovationTeamMemberRequest {
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Role is mandatory")
    private String role;
}

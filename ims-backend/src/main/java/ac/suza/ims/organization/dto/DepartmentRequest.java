package ac.suza.ims.organization.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class DepartmentRequest {

    @NotBlank(message = "Department code is mandatory")
    @Size(max = 50)
    private String code;

    @NotBlank(message = "Department name is mandatory")
    @Size(max = 150)
    private String name;

    @Size(max = 1000)
    private String description;

    @Size(max = 255)
    private String officeLocation;

    @Email(message = "Email should be valid")
    @Size(max = 150)
    private String email;

    @Size(max = 50)
    private String phone;

    @NotNull(message = "School ID is mandatory")
    private UUID schoolId;
}

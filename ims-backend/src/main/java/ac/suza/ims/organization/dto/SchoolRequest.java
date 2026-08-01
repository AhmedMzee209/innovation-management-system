package ac.suza.ims.organization.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class SchoolRequest {

    @NotBlank(message = "School code is mandatory")
    @Size(max = 50)
    private String code;

    @NotBlank(message = "School name is mandatory")
    @Size(max = 150)
    private String name;

    @Size(max = 50)
    private String shortName;

    @Size(max = 1000)
    private String description;

    @Email(message = "Email should be valid")
    @Size(max = 150)
    private String email;

    @Size(max = 50)
    private String phoneNumber;

    @Size(max = 255)
    private String website;

    @Size(max = 500)
    private String physicalAddress;

    @Size(max = 255)
    private String logo;
}

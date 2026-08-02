package ac.suza.ims.competition.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JudgeRequest {

    private UUID userId;

    @Size(max = 50)
    private String title;

    @Size(max = 255)
    private String organization;

    @Size(max = 150)
    private String designation;

    @Size(max = 255)
    private String specialization;

    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;

    private String phone;
}

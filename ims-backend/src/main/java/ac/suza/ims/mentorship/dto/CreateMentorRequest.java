package ac.suza.ims.mentorship.dto;

import jakarta.validation.constraints.NotNull;
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
public class CreateMentorRequest {

    @NotNull(message = "User ID is mandatory")
    private UUID userId;

    @Size(max = 50)
    private String title;

    @Size(max = 255)
    private String organization;

    @Size(max = 150)
    private String position;

    @Size(max = 150)
    private String industry;

    @Size(max = 255)
    private String specialization;

    private String biography;

    private Integer yearsOfExperience;

    @Size(max = 255)
    private String linkedinProfile;

    @Size(max = 255)
    private String website;
}

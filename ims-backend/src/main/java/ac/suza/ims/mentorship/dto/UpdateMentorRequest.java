package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.MentorStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMentorRequest {

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

    private MentorStatus status;
}

package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.MentorStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorResponse {

    private UUID id;
    private String mentorCode;
    private UUID userId;
    private String fullName;
    private String email;
    private String title;
    private String organization;
    private String position;
    private String industry;
    private String specialization;
    private String biography;
    private Integer yearsOfExperience;
    private String linkedinProfile;
    private String website;
    private MentorStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package ac.suza.ims.mentorship.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorFeedbackRequest {

    @NotNull(message = "Session ID is mandatory")
    private UUID sessionId;

    private String strengths;
    private String weaknesses;
    private String recommendations;
    private String overallRemarks;
}

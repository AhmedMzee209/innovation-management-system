package ac.suza.ims.mentorship.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorFeedbackResponse {

    private UUID id;
    private UUID sessionId;
    private String sessionTitle;
    private String strengths;
    private String weaknesses;
    private String recommendations;
    private String overallRemarks;
    private LocalDate feedbackDate;
}

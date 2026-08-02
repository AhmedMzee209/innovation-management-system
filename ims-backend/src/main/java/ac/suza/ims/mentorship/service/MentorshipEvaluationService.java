package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.MentorshipEvaluationRequest;
import ac.suza.ims.mentorship.dto.MentorshipEvaluationResponse;

import java.util.UUID;

public interface MentorshipEvaluationService {

    MentorshipEvaluationResponse evaluateSession(MentorshipEvaluationRequest request);

    MentorshipEvaluationResponse getEvaluationBySession(UUID sessionId);
}

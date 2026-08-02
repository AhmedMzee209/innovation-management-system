package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.MentorFeedbackRequest;
import ac.suza.ims.mentorship.dto.MentorFeedbackResponse;

import java.util.UUID;

public interface MentorFeedbackService {

    MentorFeedbackResponse recordFeedback(MentorFeedbackRequest request);

    MentorFeedbackResponse getFeedbackBySession(UUID sessionId);
}

package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.CreateSessionRequest;
import ac.suza.ims.mentorship.dto.SessionResponse;
import ac.suza.ims.mentorship.entity.SessionStatus;

import java.util.List;
import java.util.UUID;

public interface MentorshipSessionService {

    SessionResponse scheduleSession(CreateSessionRequest request);

    List<SessionResponse> getSessionsByAssignment(UUID assignmentId);

    List<SessionResponse> getSessionsByMentor(UUID mentorId);

    List<SessionResponse> getSessionsByStartup(UUID startupId);

    SessionResponse updateSessionStatus(UUID sessionId, SessionStatus status, String summary);
}

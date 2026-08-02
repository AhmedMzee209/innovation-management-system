package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.CreateSessionRequest;
import ac.suza.ims.mentorship.dto.SessionResponse;
import ac.suza.ims.mentorship.entity.AssignmentStatus;
import ac.suza.ims.mentorship.entity.MentorAssignment;
import ac.suza.ims.mentorship.entity.MentorshipSession;
import ac.suza.ims.mentorship.entity.SessionStatus;
import ac.suza.ims.mentorship.mapper.MentorshipSessionMapper;
import ac.suza.ims.mentorship.repository.MentorAssignmentRepository;
import ac.suza.ims.mentorship.repository.MentorshipSessionRepository;
import ac.suza.ims.mentorship.service.MentorshipSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorshipSessionServiceImpl implements MentorshipSessionService {

    private final MentorshipSessionRepository sessionRepository;
    private final MentorAssignmentRepository assignmentRepository;
    private final MentorshipSessionMapper sessionMapper;

    @Override
    @Transactional
    public SessionResponse scheduleSession(CreateSessionRequest request) {
        log.info("Scheduling session for assignment: {}", request.getAssignmentId());

        MentorAssignment assignment = assignmentRepository.findById(request.getAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + request.getAssignmentId()));

        if (assignment.getStatus() != AssignmentStatus.ACTIVE) {
            throw new BusinessException("Sessions can only be scheduled for ACTIVE mentor assignments.");
        }

        MentorshipSession session = sessionMapper.toEntity(request);
        session.setAssignment(assignment);
        session.setStatus(SessionStatus.SCHEDULED);

        return sessionMapper.toResponse(sessionRepository.save(session));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SessionResponse> getSessionsByAssignment(UUID assignmentId) {
        log.info("Fetching sessions for assignment: {}", assignmentId);
        return sessionRepository.findByAssignmentId(assignmentId).stream()
                .map(sessionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SessionResponse> getSessionsByMentor(UUID mentorId) {
        log.info("Fetching sessions for mentor: {}", mentorId);
        return sessionRepository.findByAssignmentMentorId(mentorId).stream()
                .map(sessionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SessionResponse> getSessionsByStartup(UUID startupId) {
        log.info("Fetching sessions for startup: {}", startupId);
        return sessionRepository.findByAssignmentStartupId(startupId).stream()
                .map(sessionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SessionResponse updateSessionStatus(UUID sessionId, SessionStatus status, String summary) {
        log.info("Updating session status for ID {} to {}", sessionId, status);
        MentorshipSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + sessionId));

        session.setStatus(status);
        if (summary != null && !summary.isBlank()) {
            session.setSummary(summary);
        }

        return sessionMapper.toResponse(sessionRepository.save(session));
    }
}

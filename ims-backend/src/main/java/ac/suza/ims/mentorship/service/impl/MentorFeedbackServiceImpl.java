package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.MentorFeedbackRequest;
import ac.suza.ims.mentorship.dto.MentorFeedbackResponse;
import ac.suza.ims.mentorship.entity.MentorFeedback;
import ac.suza.ims.mentorship.entity.MentorshipSession;
import ac.suza.ims.mentorship.mapper.MentorFeedbackMapper;
import ac.suza.ims.mentorship.repository.MentorFeedbackRepository;
import ac.suza.ims.mentorship.repository.MentorshipSessionRepository;
import ac.suza.ims.mentorship.service.MentorFeedbackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorFeedbackServiceImpl implements MentorFeedbackService {

    private final MentorFeedbackRepository feedbackRepository;
    private final MentorshipSessionRepository sessionRepository;
    private final MentorFeedbackMapper feedbackMapper;

    @Override
    @Transactional
    public MentorFeedbackResponse recordFeedback(MentorFeedbackRequest request) {
        log.info("Recording feedback for session: {}", request.getSessionId());

        MentorshipSession session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + request.getSessionId()));

        if (feedbackRepository.existsBySessionId(request.getSessionId())) {
            throw new DuplicateResourceException("Feedback has already been recorded for this session.");
        }

        MentorFeedback feedback = feedbackMapper.toEntity(request);
        feedback.setSession(session);
        feedback.setFeedbackDate(LocalDate.now());

        return feedbackMapper.toResponse(feedbackRepository.save(feedback));
    }

    @Override
    @Transactional(readOnly = true)
    public MentorFeedbackResponse getFeedbackBySession(UUID sessionId) {
        log.info("Fetching feedback for session: {}", sessionId);
        MentorFeedback feedback = feedbackRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for session id: " + sessionId));
        return feedbackMapper.toResponse(feedback);
    }
}

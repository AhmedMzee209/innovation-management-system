package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.MentorshipEvaluationRequest;
import ac.suza.ims.mentorship.dto.MentorshipEvaluationResponse;
import ac.suza.ims.mentorship.entity.MentorshipEvaluation;
import ac.suza.ims.mentorship.entity.MentorshipSession;
import ac.suza.ims.mentorship.mapper.MentorshipEvaluationMapper;
import ac.suza.ims.mentorship.repository.MentorshipEvaluationRepository;
import ac.suza.ims.mentorship.repository.MentorshipSessionRepository;
import ac.suza.ims.mentorship.service.MentorshipEvaluationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorshipEvaluationServiceImpl implements MentorshipEvaluationService {

    private final MentorshipEvaluationRepository evaluationRepository;
    private final MentorshipSessionRepository sessionRepository;
    private final MentorshipEvaluationMapper evaluationMapper;

    @Override
    @Transactional
    public MentorshipEvaluationResponse evaluateSession(MentorshipEvaluationRequest request) {
        log.info("Evaluating session: {}", request.getSessionId());

        MentorshipSession session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + request.getSessionId()));

        if (evaluationRepository.existsBySessionId(request.getSessionId())) {
            throw new DuplicateResourceException("Evaluation already exists for this session.");
        }

        MentorshipEvaluation evaluation = evaluationMapper.toEntity(request);
        evaluation.setSession(session);
        evaluation.setEvaluationDate(LocalDate.now());

        // Calculate overall score if not provided
        if (evaluation.getOverallScore() == null) {
            double total = 0.0;
            int count = 0;
            if (evaluation.getCommunicationScore() != null) { total += evaluation.getCommunicationScore(); count++; }
            if (evaluation.getTechnicalScore() != null) { total += evaluation.getTechnicalScore(); count++; }
            if (evaluation.getBusinessScore() != null) { total += evaluation.getBusinessScore(); count++; }
            if (evaluation.getLeadershipScore() != null) { total += evaluation.getLeadershipScore(); count++; }
            if (count > 0) {
                evaluation.setOverallScore(Math.round((total / count) * 100.0) / 100.0);
            }
        }

        return evaluationMapper.toResponse(evaluationRepository.save(evaluation));
    }

    @Override
    @Transactional(readOnly = true)
    public MentorshipEvaluationResponse getEvaluationBySession(UUID sessionId) {
        log.info("Fetching evaluation for session: {}", sessionId);
        MentorshipEvaluation evaluation = evaluationRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation not found for session id: " + sessionId));
        return evaluationMapper.toResponse(evaluation);
    }
}

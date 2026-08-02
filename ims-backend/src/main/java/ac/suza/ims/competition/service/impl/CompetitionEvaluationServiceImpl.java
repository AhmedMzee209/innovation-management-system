package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.CompetitionEvaluationRequest;
import ac.suza.ims.competition.dto.CompetitionEvaluationResponse;
import ac.suza.ims.competition.entity.*;
import ac.suza.ims.competition.mapper.CompetitionEvaluationMapper;
import ac.suza.ims.competition.mapper.CompetitionScoreMapper;
import ac.suza.ims.competition.repository.*;
import ac.suza.ims.competition.service.CompetitionEvaluationService;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompetitionEvaluationServiceImpl implements CompetitionEvaluationService {

    private final CompetitionEvaluationRepository evaluationRepository;
    private final CompetitionScoreRepository scoreRepository;
    private final JudgeAssignmentRepository judgeAssignmentRepository;
    private final CompetitionRegistrationRepository registrationRepository;
    private final CompetitionEvaluationMapper evaluationMapper;
    private final CompetitionScoreMapper scoreMapper;

    @Override
    @Transactional
    public CompetitionEvaluationResponse evaluateStartup(CompetitionEvaluationRequest request) {
        log.info("Evaluating startup registration ID {} by judge assignment ID {}", request.getRegistrationId(), request.getJudgeAssignmentId());

        JudgeAssignment assignment = judgeAssignmentRepository.findById(request.getJudgeAssignmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Judge assignment not found with id: " + request.getJudgeAssignmentId()));

        CompetitionRegistration registration = registrationRepository.findById(request.getRegistrationId())
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + request.getRegistrationId()));

        // Business Rule: Conflict of Interest Check — Judge cannot evaluate startup they manage or innovate
        if (assignment.getJudge().getUser() != null && registration.getStartup().getManager() != null
                && assignment.getJudge().getUser().getId().equals(registration.getStartup().getManager().getId())) {
            throw new BusinessException("Conflict of interest: Judge cannot evaluate a startup they manage.");
        }

        // Business Rule: Non-duplicate evaluation per assignment & registration
        if (evaluationRepository.existsByJudgeAssignmentIdAndRegistrationId(request.getJudgeAssignmentId(), request.getRegistrationId())) {
            throw new DuplicateResourceException("This judge has already evaluated this registration.");
        }

        CompetitionEvaluation evaluation = CompetitionEvaluation.builder()
                .judgeAssignment(assignment)
                .registration(registration)
                .evaluationDate(LocalDate.now())
                .remarks(request.getRemarks())
                .status(EvaluationStatus.COMPLETED)
                .build();

        CompetitionEvaluation savedEvaluation = evaluationRepository.save(evaluation);

        List<CompetitionEvaluationResponse.ScoreResponseDto> scoreDtos = new ArrayList<>();
        if (request.getScores() != null && !request.getScores().isEmpty()) {
            for (CompetitionEvaluationRequest.ScoreItemDto item : request.getScores()) {
                CompetitionScore score = CompetitionScore.builder()
                        .evaluation(savedEvaluation)
                        .criteria(item.getCriteria())
                        .score(item.getScore())
                        .maximumScore(item.getMaximumScore())
                        .remarks(item.getRemarks())
                        .build();
                CompetitionScore savedScore = scoreRepository.save(score);
                scoreDtos.add(scoreMapper.toResponse(savedScore));
            }
        }

        CompetitionEvaluationResponse response = evaluationMapper.toResponse(savedEvaluation);
        response.setScores(scoreDtos);
        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompetitionEvaluationResponse> getEvaluationsByRegistration(UUID registrationId) {
        log.info("Fetching evaluations for registration ID: {}", registrationId);
        return evaluationRepository.findByRegistrationId(registrationId).stream()
                .map(eval -> {
                    CompetitionEvaluationResponse response = evaluationMapper.toResponse(eval);
                    List<CompetitionEvaluationResponse.ScoreResponseDto> scores = scoreRepository.findByEvaluationId(eval.getId()).stream()
                            .map(scoreMapper::toResponse)
                            .collect(Collectors.toList());
                    response.setScores(scores);
                    return response;
                })
                .collect(Collectors.toList());
    }
}

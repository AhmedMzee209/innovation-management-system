package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.CompetitionResultResponse;
import ac.suza.ims.competition.entity.*;
import ac.suza.ims.competition.mapper.CompetitionResultMapper;
import ac.suza.ims.competition.repository.*;
import ac.suza.ims.competition.service.CompetitionResultService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompetitionResultServiceImpl implements CompetitionResultService {

    private final CompetitionResultRepository resultRepository;
    private final CompetitionRepository competitionRepository;
    private final CompetitionRegistrationRepository registrationRepository;
    private final CompetitionEvaluationRepository evaluationRepository;
    private final CompetitionScoreRepository scoreRepository;
    private final CompetitionResultMapper resultMapper;

    @Override
    @Transactional
    public List<CompetitionResultResponse> calculateAndPublishResults(UUID competitionId) {
        log.info("Calculating and publishing results for competition ID: {}", competitionId);

        Competition competition = competitionRepository.findById(competitionId)
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + competitionId));

        List<CompetitionRegistration> registrations = registrationRepository.findByCompetitionId(competitionId);

        // Map to store calculated scores for each startup registration
        Map<CompetitionRegistration, Double> startupScores = new HashMap<>();

        for (CompetitionRegistration registration : registrations) {
            List<CompetitionEvaluation> evaluations = evaluationRepository.findByRegistrationId(registration.getId());
            // Filter completed evaluations
            List<CompetitionEvaluation> completedEvals = evaluations.stream()
                    .filter(e -> e.getStatus() == EvaluationStatus.COMPLETED)
                    .collect(Collectors.toList());

            if (!completedEvals.isEmpty()) {
                double totalScoreSum = 0.0;
                for (CompetitionEvaluation eval : completedEvals) {
                    List<CompetitionScore> scores = scoreRepository.findByEvaluationId(eval.getId());
                    double evalSum = scores.stream().mapToDouble(CompetitionScore::getScore).sum();
                    totalScoreSum += evalSum;
                }
                double avgScore = Math.round((totalScoreSum / completedEvals.size()) * 100.0) / 100.0;
                startupScores.put(registration, avgScore);
            }
        }

        // Sort registrations descending by total average score
        List<Map.Entry<CompetitionRegistration, Double>> sortedList = startupScores.entrySet().stream()
                .sorted(Map.Entry.<CompetitionRegistration, Double>comparingByValue().reversed())
                .collect(Collectors.toList());

        List<CompetitionResult> savedResults = new ArrayList<>();
        int rank = 1;
        for (Map.Entry<CompetitionRegistration, Double> entry : sortedList) {
            CompetitionRegistration registration = entry.getKey();
            Double score = entry.getValue();

            ResultDecision decision;
            if (rank == 1) {
                decision = ResultDecision.WINNER;
            } else if (rank == 2 || rank == 3) {
                decision = ResultDecision.RUNNER_UP;
            } else if (rank <= 5) {
                decision = ResultDecision.FINALIST;
            } else {
                decision = ResultDecision.PARTICIPANT;
            }

            Optional<CompetitionResult> existingResultOpt = resultRepository.findByCompetitionIdAndStartupId(competitionId, registration.getStartup().getId());
            CompetitionResult result = existingResultOpt.orElseGet(() -> CompetitionResult.builder()
                    .competition(competition)
                    .startup(registration.getStartup())
                    .build());

            result.setRank(rank);
            result.setTotalScore(score);
            result.setDecision(decision);
            result.setAnnouncementDate(LocalDate.now());
            result.setRemarks("Official competition results published.");

            savedResults.add(resultRepository.save(result));
            rank++;
        }

        // Move competition status to COMPLETED
        competition.setStatus(CompetitionStatus.COMPLETED);
        competition.setAnnouncementDate(LocalDate.now());
        competitionRepository.save(competition);

        return savedResults.stream()
                .map(resultMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompetitionResultResponse> getResultsByCompetition(UUID competitionId) {
        log.info("Fetching results for competition ID: {}", competitionId);
        return resultRepository.findByCompetitionIdOrderByRankAsc(competitionId).stream()
                .map(resultMapper::toResponse)
                .collect(Collectors.toList());
    }
}

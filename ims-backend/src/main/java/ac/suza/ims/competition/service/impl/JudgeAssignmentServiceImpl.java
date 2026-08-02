package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.JudgeAssignmentRequest;
import ac.suza.ims.competition.dto.JudgeAssignmentResponse;
import ac.suza.ims.competition.entity.Competition;
import ac.suza.ims.competition.entity.Judge;
import ac.suza.ims.competition.entity.JudgeAssignment;
import ac.suza.ims.competition.mapper.JudgeAssignmentMapper;
import ac.suza.ims.competition.repository.CompetitionRepository;
import ac.suza.ims.competition.repository.JudgeAssignmentRepository;
import ac.suza.ims.competition.repository.JudgeRepository;
import ac.suza.ims.competition.service.JudgeAssignmentService;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JudgeAssignmentServiceImpl implements JudgeAssignmentService {

    private final JudgeAssignmentRepository assignmentRepository;
    private final CompetitionRepository competitionRepository;
    private final JudgeRepository judgeRepository;
    private final JudgeAssignmentMapper assignmentMapper;

    @Override
    @Transactional
    public JudgeAssignmentResponse assignJudge(JudgeAssignmentRequest request) {
        log.info("Assigning judge ID {} to competition ID {}", request.getJudgeId(), request.getCompetitionId());

        Competition competition = competitionRepository.findById(request.getCompetitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + request.getCompetitionId()));

        Judge judge = judgeRepository.findById(request.getJudgeId())
                .orElseThrow(() -> new ResourceNotFoundException("Judge not found with id: " + request.getJudgeId()));

        if (assignmentRepository.existsByCompetitionIdAndJudgeId(request.getCompetitionId(), request.getJudgeId())) {
            throw new DuplicateResourceException("This judge is already assigned to this competition.");
        }

        JudgeAssignment assignment = JudgeAssignment.builder()
                .competition(competition)
                .judge(judge)
                .assignmentDate(LocalDate.now())
                .status("ACTIVE")
                .build();

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<JudgeAssignmentResponse> getAssignmentsByCompetition(UUID competitionId) {
        log.info("Fetching judge assignments for competition ID: {}", competitionId);
        return assignmentRepository.findByCompetitionId(competitionId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JudgeAssignmentResponse> getAssignmentsByJudge(UUID judgeId) {
        log.info("Fetching competition assignments for judge ID: {}", judgeId);
        return assignmentRepository.findByJudgeId(judgeId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }
}

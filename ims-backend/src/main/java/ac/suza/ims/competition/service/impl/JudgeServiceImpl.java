package ac.suza.ims.competition.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.competition.dto.JudgeRequest;
import ac.suza.ims.competition.dto.JudgeResponse;
import ac.suza.ims.competition.entity.Judge;
import ac.suza.ims.competition.entity.JudgeStatus;
import ac.suza.ims.competition.mapper.JudgeMapper;
import ac.suza.ims.competition.repository.JudgeRepository;
import ac.suza.ims.competition.service.JudgeService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JudgeServiceImpl implements JudgeService {

    private final JudgeRepository judgeRepository;
    private final UserRepository userRepository;
    private final JudgeMapper judgeMapper;

    @Override
    @Transactional
    public JudgeResponse registerJudge(JudgeRequest request) {
        log.info("Registering new judge with email: {}", request.getEmail());
        Judge judge = judgeMapper.toEntity(request);
        judge.setJudgeCode(generateJudgeCode());
        judge.setStatus(JudgeStatus.ACTIVE);

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));
            judge.setUser(user);
        }

        return judgeMapper.toResponse(judgeRepository.save(judge));
    }

    @Override
    @Transactional(readOnly = true)
    public JudgeResponse getJudgeById(UUID id) {
        log.info("Fetching judge by ID: {}", id);
        Judge judge = judgeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Judge not found with id: " + id));
        return judgeMapper.toResponse(judge);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JudgeResponse> getAllJudges() {
        log.info("Fetching all judges");
        return judgeRepository.findAll().stream()
                .map(judgeMapper::toResponse)
                .collect(Collectors.toList());
    }

    private String generateJudgeCode() {
        long count = judgeRepository.count() + 1;
        return String.format("JDG-%d-%04d", Year.now().getValue(), count);
    }
}

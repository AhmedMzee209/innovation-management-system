package ac.suza.ims.startup.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.dto.StartupStageResponse;
import ac.suza.ims.startup.entity.StartupStage;
import ac.suza.ims.startup.mapper.StartupStageMapper;
import ac.suza.ims.startup.repository.StartupStageRepository;
import ac.suza.ims.startup.service.StartupStageService;
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
public class StartupStageServiceImpl implements StartupStageService {

    private final StartupStageRepository stageRepository;
    private final StartupStageMapper stageMapper;

    @Override
    @Transactional(readOnly = true)
    public List<StartupStageResponse> getAllStages() {
        log.info("Fetching all startup stages");
        return stageRepository.findAllByOrderByOrderNumberAsc().stream()
                .map(stageMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StartupStageResponse getStageById(UUID id) {
        log.info("Fetching startup stage by ID: {}", id);
        StartupStage stage = stageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Startup stage not found with id: " + id));
        return stageMapper.toResponse(stage);
    }
}

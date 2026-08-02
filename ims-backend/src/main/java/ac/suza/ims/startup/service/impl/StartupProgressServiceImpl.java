package ac.suza.ims.startup.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.dto.StartupProgressRequest;
import ac.suza.ims.startup.dto.StartupProgressResponse;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupProgress;
import ac.suza.ims.startup.mapper.StartupProgressMapper;
import ac.suza.ims.startup.repository.StartupProgressRepository;
import ac.suza.ims.startup.repository.StartupRepository;
import ac.suza.ims.startup.service.StartupProgressService;
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
public class StartupProgressServiceImpl implements StartupProgressService {

    private final StartupProgressRepository progressRepository;
    private final StartupRepository startupRepository;
    private final StartupProgressMapper progressMapper;

    @Override
    @Transactional
    public StartupProgressResponse addProgressRecord(UUID startupId, StartupProgressRequest request) {
        log.info("Adding progress record for startup: {}", startupId);
        Startup startup = startupRepository.findById(startupId)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + startupId));

        StartupProgress progress = progressMapper.toEntity(request);
        progress.setStartup(startup);
        if (progress.getProgressDate() == null) {
            progress.setProgressDate(LocalDate.now());
        }

        return progressMapper.toResponse(progressRepository.save(progress));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupProgressResponse> getProgressHistory(UUID startupId) {
        log.info("Fetching progress history for startup: {}", startupId);
        return progressRepository.findByStartupIdOrderByProgressDateDesc(startupId).stream()
                .map(progressMapper::toResponse)
                .collect(Collectors.toList());
    }
}

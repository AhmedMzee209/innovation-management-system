package ac.suza.ims.startup.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.dto.StartupAchievementRequest;
import ac.suza.ims.startup.dto.StartupAchievementResponse;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupAchievement;
import ac.suza.ims.startup.mapper.StartupAchievementMapper;
import ac.suza.ims.startup.repository.StartupAchievementRepository;
import ac.suza.ims.startup.repository.StartupRepository;
import ac.suza.ims.startup.service.StartupAchievementService;
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
public class StartupAchievementServiceImpl implements StartupAchievementService {

    private final StartupAchievementRepository achievementRepository;
    private final StartupRepository startupRepository;
    private final StartupAchievementMapper achievementMapper;

    @Override
    @Transactional
    public StartupAchievementResponse addAchievement(UUID startupId, StartupAchievementRequest request) {
        log.info("Adding achievement for startup: {}", startupId);
        Startup startup = startupRepository.findById(startupId)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + startupId));

        StartupAchievement achievement = achievementMapper.toEntity(request);
        achievement.setStartup(startup);

        return achievementMapper.toResponse(achievementRepository.save(achievement));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupAchievementResponse> getAchievements(UUID startupId) {
        log.info("Fetching achievements for startup: {}", startupId);
        return achievementRepository.findByStartupId(startupId).stream()
                .map(achievementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteAchievement(UUID achievementId) {
        log.info("Deleting achievement: {}", achievementId);
        StartupAchievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + achievementId));
        achievementRepository.delete(achievement);
    }
}

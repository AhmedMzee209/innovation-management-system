package ac.suza.ims.startup.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.dto.StartupMilestoneRequest;
import ac.suza.ims.startup.dto.StartupMilestoneResponse;
import ac.suza.ims.startup.entity.MilestoneStatus;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupMilestone;
import ac.suza.ims.startup.mapper.StartupMilestoneMapper;
import ac.suza.ims.startup.repository.StartupMilestoneRepository;
import ac.suza.ims.startup.repository.StartupRepository;
import ac.suza.ims.startup.service.StartupMilestoneService;
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
public class StartupMilestoneServiceImpl implements StartupMilestoneService {

    private final StartupMilestoneRepository milestoneRepository;
    private final StartupRepository startupRepository;
    private final StartupMilestoneMapper milestoneMapper;

    @Override
    @Transactional
    public StartupMilestoneResponse addMilestone(UUID startupId, StartupMilestoneRequest request) {
        log.info("Adding milestone for startup: {}", startupId);
        Startup startup = startupRepository.findById(startupId)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + startupId));

        StartupMilestone milestone = milestoneMapper.toEntity(request);
        milestone.setStartup(startup);
        if (milestone.getStatus() == null) {
            milestone.setStatus(MilestoneStatus.PLANNED);
        }

        return milestoneMapper.toResponse(milestoneRepository.save(milestone));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupMilestoneResponse> getMilestones(UUID startupId) {
        log.info("Fetching milestones for startup: {}", startupId);
        return milestoneRepository.findByStartupId(startupId).stream()
                .map(milestoneMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StartupMilestoneResponse updateMilestone(UUID milestoneId, StartupMilestoneRequest request) {
        log.info("Updating milestone: {}", milestoneId);
        StartupMilestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found with id: " + milestoneId));

        milestoneMapper.updateEntity(request, milestone);
        if (milestone.getStatus() == MilestoneStatus.COMPLETED && milestone.getCompletionDate() == null) {
            milestone.setCompletionDate(LocalDate.now());
        }

        return milestoneMapper.toResponse(milestoneRepository.save(milestone));
    }

    @Override
    @Transactional
    public void deleteMilestone(UUID milestoneId) {
        log.info("Deleting milestone: {}", milestoneId);
        StartupMilestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found with id: " + milestoneId));
        milestoneRepository.delete(milestone);
    }
}

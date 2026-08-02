package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.FundingMilestoneRequest;
import ac.suza.ims.funding.dto.FundingMilestoneResponse;
import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingMilestone;
import ac.suza.ims.funding.mapper.FundingMilestoneMapper;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.funding.repository.FundingMilestoneRepository;
import ac.suza.ims.funding.service.FundingMilestoneService;
import ac.suza.ims.startup.entity.MilestoneStatus;
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
public class FundingMilestoneServiceImpl implements FundingMilestoneService {

    private final FundingMilestoneRepository milestoneRepository;
    private final FundingApplicationRepository applicationRepository;
    private final FundingMilestoneMapper milestoneMapper;

    @Override
    @Transactional
    public FundingMilestoneResponse createMilestone(FundingMilestoneRequest request) {
        log.info("Creating milestone for application ID: {}", request.getApplicationId());

        FundingApplication application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + request.getApplicationId()));

        FundingMilestone milestone = milestoneMapper.toEntity(request);
        milestone.setApplication(application);
        if (milestone.getStatus() == null) {
            milestone.setStatus(MilestoneStatus.PLANNED);
        }

        return milestoneMapper.toResponse(milestoneRepository.save(milestone));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingMilestoneResponse> getMilestonesByApplication(UUID applicationId) {
        log.info("Fetching milestones for application ID: {}", applicationId);
        return milestoneRepository.findByApplicationId(applicationId).stream()
                .map(milestoneMapper::toResponse)
                .collect(Collectors.toList());
    }
}

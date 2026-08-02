package ac.suza.ims.opportunity.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.opportunity.dto.OpportunityApplicationRequest;
import ac.suza.ims.opportunity.dto.OpportunityApplicationResponse;
import ac.suza.ims.opportunity.entity.ApplicationStatus;
import ac.suza.ims.opportunity.entity.Opportunity;
import ac.suza.ims.opportunity.entity.OpportunityApplication;
import ac.suza.ims.opportunity.entity.OpportunityStatus;
import ac.suza.ims.opportunity.mapper.OpportunityApplicationMapper;
import ac.suza.ims.opportunity.repository.OpportunityApplicationRepository;
import ac.suza.ims.opportunity.repository.OpportunityRepository;
import ac.suza.ims.opportunity.service.OpportunityApplicationService;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupStatus;
import ac.suza.ims.startup.repository.StartupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityApplicationServiceImpl implements OpportunityApplicationService {

    private final OpportunityApplicationRepository applicationRepository;
    private final OpportunityRepository opportunityRepository;
    private final StartupRepository startupRepository;
    private final OpportunityApplicationMapper applicationMapper;

    @Override
    @Transactional
    public OpportunityApplicationResponse applyForOpportunity(OpportunityApplicationRequest request) {
        log.info("Startup ID {} applying for opportunity ID {}", request.getStartupId(), request.getOpportunityId());

        Opportunity opportunity = opportunityRepository.findById(request.getOpportunityId())
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + request.getOpportunityId()));

        Startup startup = startupRepository.findById(request.getStartupId())
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + request.getStartupId()));

        // Business Rule: Only active startups may apply
        if (startup.getStatus() == StartupStatus.INACTIVE || startup.getStatus() == StartupStatus.CLOSED) {
            throw new BusinessException("Only active startups are eligible to apply for opportunities.");
        }

        // Business Rule: Only OPEN opportunities accept applications
        if (opportunity.getStatus() != OpportunityStatus.OPEN) {
            throw new BusinessException("Applications are only accepted for OPEN opportunities.");
        }

        // Business Rule: Application deadline check
        if (opportunity.getApplicationCloseDate() != null && LocalDate.now().isAfter(opportunity.getApplicationCloseDate())) {
            throw new BusinessException("Application deadline has passed for this opportunity.");
        }

        // Business Rule: A startup can apply only once for the same opportunity
        if (applicationRepository.existsByOpportunityIdAndStartupId(request.getOpportunityId(), request.getStartupId())) {
            throw new DuplicateResourceException("This startup has already applied for this opportunity.");
        }

        OpportunityApplication application = applicationMapper.toEntity(request);
        application.setOpportunity(opportunity);
        application.setStartup(startup);
        application.setApplicationNumber(generateApplicationNumber());
        application.setApplicationDate(LocalDate.now());
        application.setStatus(ApplicationStatus.SUBMITTED);

        return applicationMapper.toResponse(applicationRepository.save(application));
    }

    @Override
    @Transactional(readOnly = true)
    public OpportunityApplicationResponse getApplicationById(UUID id) {
        log.info("Fetching application by ID: {}", id);
        OpportunityApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return applicationMapper.toResponse(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunityApplicationResponse> getApplicationsByOpportunity(UUID opportunityId) {
        log.info("Fetching applications for opportunity ID: {}", opportunityId);
        return applicationRepository.findByOpportunityId(opportunityId).stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunityApplicationResponse> getApplicationsByStartup(UUID startupId) {
        log.info("Fetching applications for startup ID: {}", startupId);
        return applicationRepository.findByStartupId(startupId).stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OpportunityApplicationResponse updateApplicationStatus(UUID id, ApplicationStatus status, String remarks) {
        log.info("Updating application status for ID {} to {}", id, status);
        OpportunityApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        application.setStatus(status);
        if (remarks != null) {
            application.setRemarks(remarks);
        }
        if (status == ApplicationStatus.APPROVED || status == ApplicationStatus.REJECTED) {
            application.setDecisionDate(LocalDate.now());
        }

        return applicationMapper.toResponse(applicationRepository.save(application));
    }

    private String generateApplicationNumber() {
        long count = applicationRepository.count() + 1;
        return String.format("APP-OPP-%d-%04d", Year.now().getValue(), count);
    }
}

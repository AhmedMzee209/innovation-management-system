package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.ApplyFundingRequest;
import ac.suza.ims.funding.dto.FundingApplicationResponse;
import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingApplicationStatus;
import ac.suza.ims.funding.entity.FundingProgram;
import ac.suza.ims.funding.entity.FundingProgramStatus;
import ac.suza.ims.funding.mapper.FundingApplicationMapper;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.funding.repository.FundingProgramRepository;
import ac.suza.ims.funding.service.FundingApplicationService;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupStatus;
import ac.suza.ims.startup.repository.StartupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FundingApplicationServiceImpl implements FundingApplicationService {

    private final FundingApplicationRepository applicationRepository;
    private final FundingProgramRepository programRepository;
    private final StartupRepository startupRepository;
    private final FundingApplicationMapper applicationMapper;

    @Override
    @Transactional
    public FundingApplicationResponse applyForFunding(ApplyFundingRequest request) {
        log.info("Submitting funding application for startup ID {} to program ID {}", request.getStartupId(), request.getProgramId());

        Startup startup = startupRepository.findById(request.getStartupId())
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + request.getStartupId()));

        // Business Rule: Only active/incubated/accelerated startups can apply
        if (startup.getStatus() == StartupStatus.INACTIVE || startup.getStatus() == StartupStatus.CLOSED) {
            throw new BusinessException("Only active startups are eligible to apply for funding.");
        }

        FundingProgram program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new ResourceNotFoundException("Funding program not found with id: " + request.getProgramId()));

        // Business Rule: Funding Program must be OPEN
        if (program.getStatus() != FundingProgramStatus.OPEN) {
            throw new BusinessException("Applications can only be submitted to OPEN funding programs.");
        }

        // Business Rule: Application deadline must not be expired
        if (program.getApplicationCloseDate() != null && LocalDate.now().isAfter(program.getApplicationCloseDate())) {
            throw new BusinessException("The application deadline for this program has expired.");
        }

        // Business Rule: A startup cannot submit duplicate applications to the same funding program
        if (applicationRepository.existsByStartupIdAndProgramId(request.getStartupId(), request.getProgramId())) {
            throw new DuplicateResourceException("This startup has already submitted an application to this funding program.");
        }

        // Business Rule: Requested amount cannot exceed maximum program amount if specified
        if (program.getMaximumAmount() != null && request.getRequestedAmount().compareTo(program.getMaximumAmount()) > 0) {
            throw new BusinessException("Requested amount exceeds the maximum allowable amount for this program: " + program.getMaximumAmount());
        }

        FundingApplication application = applicationMapper.toEntity(request);
        application.setStartup(startup);
        application.setProgram(program);
        application.setApplicationNumber(generateApplicationNumber());
        application.setSubmissionDate(LocalDate.now());
        application.setStatus(FundingApplicationStatus.SUBMITTED);

        return applicationMapper.toResponse(applicationRepository.save(application));
    }

    @Override
    @Transactional(readOnly = true)
    public FundingApplicationResponse getApplicationById(UUID id) {
        log.info("Fetching application by ID: {}", id);
        FundingApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + id));
        return applicationMapper.toResponse(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingApplicationResponse> getApplicationsByStartup(UUID startupId) {
        log.info("Fetching applications for startup ID: {}", startupId);
        return applicationRepository.findByStartupId(startupId).stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingApplicationResponse> getApplicationsByProgram(UUID programId) {
        log.info("Fetching applications for program ID: {}", programId);
        return applicationRepository.findByProgramId(programId).stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingApplicationResponse> getAllApplications() {
        log.info("Fetching all funding applications");
        return applicationRepository.findAll().stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FundingApplicationResponse updateApplicationStatus(UUID id, FundingApplicationStatus status, BigDecimal approvedAmount) {
        log.info("Updating application status for ID {} to {}", id, status);
        FundingApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + id));

        // Business Rule: Approved amount cannot exceed requested amount
        if (approvedAmount != null) {
            if (approvedAmount.compareTo(application.getRequestedAmount()) > 0) {
                throw new BusinessException("Approved amount cannot exceed requested amount.");
            }
            application.setApprovedAmount(approvedAmount);
        }

        application.setStatus(status);
        if (status == FundingApplicationStatus.APPROVED || status == FundingApplicationStatus.PARTIALLY_APPROVED || status == FundingApplicationStatus.REJECTED) {
            application.setDecisionDate(LocalDate.now());
        }

        return applicationMapper.toResponse(applicationRepository.save(application));
    }

    private String generateApplicationNumber() {
        long count = applicationRepository.count() + 1;
        return String.format("APP-%d-%04d", Year.now().getValue(), count);
    }
}

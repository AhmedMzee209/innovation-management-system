package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.FundingDisbursementRequest;
import ac.suza.ims.funding.dto.FundingDisbursementResponse;
import ac.suza.ims.funding.entity.DisbursementStatus;
import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingApplicationStatus;
import ac.suza.ims.funding.entity.FundingDisbursement;
import ac.suza.ims.funding.mapper.FundingDisbursementMapper;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.funding.repository.FundingDisbursementRepository;
import ac.suza.ims.funding.service.FundingDisbursementService;
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
public class FundingDisbursementServiceImpl implements FundingDisbursementService {

    private final FundingDisbursementRepository disbursementRepository;
    private final FundingApplicationRepository applicationRepository;
    private final FundingDisbursementMapper disbursementMapper;

    @Override
    @Transactional
    public FundingDisbursementResponse recordDisbursement(FundingDisbursementRequest request) {
        log.info("Recording disbursement for application ID: {}", request.getApplicationId());

        FundingApplication application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + request.getApplicationId()));

        // Business Rule: Disbursement can only occur after approval
        if (application.getStatus() != FundingApplicationStatus.APPROVED
                && application.getStatus() != FundingApplicationStatus.PARTIALLY_APPROVED
                && application.getStatus() != FundingApplicationStatus.FUNDED) {
            throw new BusinessException("Disbursement can only be created for APPROVED or FUNDED applications.");
        }

        FundingDisbursement disbursement = disbursementMapper.toEntity(request);
        disbursement.setApplication(application);
        disbursement.setDisbursementNumber(generateDisbursementNumber());
        disbursement.setDisbursementDate(LocalDate.now());
        disbursement.setStatus(DisbursementStatus.PAID);

        // Update application status to FUNDED
        if (application.getStatus() != FundingApplicationStatus.FUNDED) {
            application.setStatus(FundingApplicationStatus.FUNDED);
            applicationRepository.save(application);
        }

        return disbursementMapper.toResponse(disbursementRepository.save(disbursement));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingDisbursementResponse> getDisbursementsByApplication(UUID applicationId) {
        log.info("Fetching disbursements for application ID: {}", applicationId);
        return disbursementRepository.findByApplicationId(applicationId).stream()
                .map(disbursementMapper::toResponse)
                .collect(Collectors.toList());
    }

    private String generateDisbursementNumber() {
        long count = disbursementRepository.count() + 1;
        return String.format("DSB-%d-%04d", Year.now().getValue(), count);
    }
}

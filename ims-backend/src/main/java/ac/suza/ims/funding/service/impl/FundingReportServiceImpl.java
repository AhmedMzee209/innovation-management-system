package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.FundingReportRequest;
import ac.suza.ims.funding.dto.FundingReportResponse;
import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingReport;
import ac.suza.ims.funding.entity.ReportStatus;
import ac.suza.ims.funding.mapper.FundingReportMapper;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.funding.repository.FundingReportRepository;
import ac.suza.ims.funding.service.FundingReportService;
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
public class FundingReportServiceImpl implements FundingReportService {

    private final FundingReportRepository reportRepository;
    private final FundingApplicationRepository applicationRepository;
    private final FundingReportMapper reportMapper;

    @Override
    @Transactional
    public FundingReportResponse submitReport(FundingReportRequest request) {
        log.info("Submitting funding report for application ID: {}", request.getApplicationId());

        FundingApplication application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + request.getApplicationId()));

        FundingReport report = reportMapper.toEntity(request);
        report.setApplication(application);
        report.setSubmissionDate(LocalDate.now());
        report.setStatus(ReportStatus.SUBMITTED);

        return reportMapper.toResponse(reportRepository.save(report));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingReportResponse> getReportsByApplication(UUID applicationId) {
        log.info("Fetching reports for application ID: {}", applicationId);
        return reportRepository.findByApplicationId(applicationId).stream()
                .map(reportMapper::toResponse)
                .collect(Collectors.toList());
    }
}

package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.FundingReportRequest;
import ac.suza.ims.funding.dto.FundingReportResponse;

import java.util.List;
import java.util.UUID;

public interface FundingReportService {

    FundingReportResponse submitReport(FundingReportRequest request);

    List<FundingReportResponse> getReportsByApplication(UUID applicationId);
}

package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.ApplyFundingRequest;
import ac.suza.ims.funding.dto.FundingApplicationResponse;
import ac.suza.ims.funding.entity.FundingApplicationStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface FundingApplicationService {

    FundingApplicationResponse applyForFunding(ApplyFundingRequest request);

    FundingApplicationResponse getApplicationById(UUID id);

    List<FundingApplicationResponse> getApplicationsByStartup(UUID startupId);

    List<FundingApplicationResponse> getApplicationsByProgram(UUID programId);

    List<FundingApplicationResponse> getAllApplications();

    FundingApplicationResponse updateApplicationStatus(UUID id, FundingApplicationStatus status, BigDecimal approvedAmount);
}

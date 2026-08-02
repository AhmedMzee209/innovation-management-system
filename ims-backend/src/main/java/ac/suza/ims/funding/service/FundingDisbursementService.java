package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.FundingDisbursementRequest;
import ac.suza.ims.funding.dto.FundingDisbursementResponse;

import java.util.List;
import java.util.UUID;

public interface FundingDisbursementService {

    FundingDisbursementResponse recordDisbursement(FundingDisbursementRequest request);

    List<FundingDisbursementResponse> getDisbursementsByApplication(UUID applicationId);
}

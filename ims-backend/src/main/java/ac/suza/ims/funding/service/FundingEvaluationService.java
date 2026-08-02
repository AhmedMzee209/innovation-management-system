package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.FundingEvaluationRequest;
import ac.suza.ims.funding.dto.FundingEvaluationResponse;

import java.util.List;
import java.util.UUID;

public interface FundingEvaluationService {

    FundingEvaluationResponse evaluateApplication(FundingEvaluationRequest request);

    List<FundingEvaluationResponse> getEvaluationsByApplication(UUID applicationId);
}

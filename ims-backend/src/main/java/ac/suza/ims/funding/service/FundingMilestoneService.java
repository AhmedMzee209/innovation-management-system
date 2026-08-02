package ac.suza.ims.funding.service;

import ac.suza.ims.funding.dto.FundingMilestoneRequest;
import ac.suza.ims.funding.dto.FundingMilestoneResponse;

import java.util.List;
import java.util.UUID;

public interface FundingMilestoneService {

    FundingMilestoneResponse createMilestone(FundingMilestoneRequest request);

    List<FundingMilestoneResponse> getMilestonesByApplication(UUID applicationId);
}

package ac.suza.ims.opportunity.service;

import ac.suza.ims.opportunity.dto.OpportunityReviewRequest;
import ac.suza.ims.opportunity.dto.OpportunityReviewResponse;

import java.util.List;
import java.util.UUID;

public interface OpportunityReviewService {

    OpportunityReviewResponse reviewApplication(OpportunityReviewRequest request);

    List<OpportunityReviewResponse> getReviewsByApplication(UUID applicationId);
}

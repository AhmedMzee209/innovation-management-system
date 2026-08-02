package ac.suza.ims.opportunity.service;

import ac.suza.ims.opportunity.dto.CreateOpportunityRequest;
import ac.suza.ims.opportunity.dto.OpportunityResponse;
import ac.suza.ims.opportunity.dto.OpportunitySummaryResponse;
import ac.suza.ims.opportunity.dto.UpdateOpportunityRequest;

import java.util.List;
import java.util.UUID;

public interface OpportunityService {

    OpportunityResponse createOpportunity(CreateOpportunityRequest request);

    OpportunityResponse getOpportunityById(UUID id);

    List<OpportunitySummaryResponse> getAllOpportunities();

    List<OpportunitySummaryResponse> getOpportunitiesByCategory(UUID categoryId);

    OpportunityResponse publishOpportunity(UUID id);

    OpportunityResponse updateOpportunity(UUID id, UpdateOpportunityRequest request);

    void deleteOpportunity(UUID id);
}

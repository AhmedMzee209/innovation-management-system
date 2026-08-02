package ac.suza.ims.opportunity.service;

import ac.suza.ims.opportunity.dto.OpportunityApplicationRequest;
import ac.suza.ims.opportunity.dto.OpportunityApplicationResponse;
import ac.suza.ims.opportunity.entity.ApplicationStatus;

import java.util.List;
import java.util.UUID;

public interface OpportunityApplicationService {

    OpportunityApplicationResponse applyForOpportunity(OpportunityApplicationRequest request);

    OpportunityApplicationResponse getApplicationById(UUID id);

    List<OpportunityApplicationResponse> getApplicationsByOpportunity(UUID opportunityId);

    List<OpportunityApplicationResponse> getApplicationsByStartup(UUID startupId);

    OpportunityApplicationResponse updateApplicationStatus(UUID id, ApplicationStatus status, String remarks);
}

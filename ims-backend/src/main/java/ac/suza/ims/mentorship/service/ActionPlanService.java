package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.ActionPlanRequest;
import ac.suza.ims.mentorship.dto.ActionPlanResponse;
import ac.suza.ims.mentorship.entity.ActionPlanStatus;

import java.util.List;
import java.util.UUID;

public interface ActionPlanService {

    ActionPlanResponse createActionPlan(ActionPlanRequest request);

    List<ActionPlanResponse> getActionPlansBySession(UUID sessionId);

    List<ActionPlanResponse> getActionPlansByUser(UUID userId);

    ActionPlanResponse updateActionPlanStatus(UUID actionPlanId, ActionPlanStatus status);
}

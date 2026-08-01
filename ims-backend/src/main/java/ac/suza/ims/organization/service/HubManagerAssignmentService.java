package ac.suza.ims.organization.service;

import ac.suza.ims.organization.dto.HubManagerAssignmentRequest;
import ac.suza.ims.organization.dto.HubManagerAssignmentResponse;

import java.util.List;
import java.util.UUID;

public interface HubManagerAssignmentService {
    HubManagerAssignmentResponse assignManager(HubManagerAssignmentRequest request);
    HubManagerAssignmentResponse unassignManager(UUID assignmentId);
    List<HubManagerAssignmentResponse> getAssignmentsByHub(UUID hubId);
    List<HubManagerAssignmentResponse> getActiveManagersByHub(UUID hubId);
}

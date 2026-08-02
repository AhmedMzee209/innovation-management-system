package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.StartupMilestoneRequest;
import ac.suza.ims.startup.dto.StartupMilestoneResponse;

import java.util.List;
import java.util.UUID;

public interface StartupMilestoneService {

    StartupMilestoneResponse addMilestone(UUID startupId, StartupMilestoneRequest request);

    List<StartupMilestoneResponse> getMilestones(UUID startupId);

    StartupMilestoneResponse updateMilestone(UUID milestoneId, StartupMilestoneRequest request);

    void deleteMilestone(UUID milestoneId);
}

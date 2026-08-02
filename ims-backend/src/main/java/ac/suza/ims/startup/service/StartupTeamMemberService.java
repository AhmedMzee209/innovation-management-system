package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.StartupTeamMemberRequest;
import ac.suza.ims.startup.dto.StartupTeamMemberResponse;

import java.util.List;
import java.util.UUID;

public interface StartupTeamMemberService {

    StartupTeamMemberResponse addTeamMember(UUID startupId, StartupTeamMemberRequest request);

    List<StartupTeamMemberResponse> getTeamMembers(UUID startupId);

    void removeTeamMember(UUID startupId, UUID memberId);
}

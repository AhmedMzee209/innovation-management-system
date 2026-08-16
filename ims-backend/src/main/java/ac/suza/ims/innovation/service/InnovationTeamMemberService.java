package ac.suza.ims.innovation.service;

import ac.suza.ims.innovation.dto.InnovationTeamMemberRequest;
import ac.suza.ims.innovation.dto.InnovationTeamMemberResponse;

import java.util.List;
import java.util.UUID;

public interface InnovationTeamMemberService {
    InnovationTeamMemberResponse addTeamMember(UUID innovationId, InnovationTeamMemberRequest request, UUID currentUserId);
    List<InnovationTeamMemberResponse> getTeamMembers(UUID innovationId);
    void removeTeamMember(UUID innovationId, UUID memberId, UUID currentUserId);
}

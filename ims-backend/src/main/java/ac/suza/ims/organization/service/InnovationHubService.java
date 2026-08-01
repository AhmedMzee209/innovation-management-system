package ac.suza.ims.organization.service;

import ac.suza.ims.organization.dto.InnovationHubRequest;
import ac.suza.ims.organization.dto.InnovationHubResponse;

import java.util.List;
import java.util.UUID;

public interface InnovationHubService {
    List<InnovationHubResponse> getAllHubs();
    List<InnovationHubResponse> getHubsBySchool(UUID schoolId);
    InnovationHubResponse getHubById(UUID id);
    InnovationHubResponse createHub(InnovationHubRequest request);
    InnovationHubResponse updateHub(UUID id, InnovationHubRequest request);
    void deleteHub(UUID id);
}

package ac.suza.ims.innovation.service;

import ac.suza.ims.innovation.dto.CreateInnovationRequest;
import ac.suza.ims.innovation.dto.InnovationResponse;
import ac.suza.ims.innovation.dto.InnovationSummaryResponse;
import ac.suza.ims.innovation.dto.UpdateInnovationRequest;

import java.util.List;
import java.util.UUID;

public interface InnovationService {
    InnovationResponse createInnovation(CreateInnovationRequest request, UUID ownerId);
    InnovationResponse updateInnovation(UUID id, UpdateInnovationRequest request, UUID userId);
    void deleteInnovation(UUID id, UUID userId);
    InnovationResponse getInnovationById(UUID id);
    List<InnovationSummaryResponse> getAllInnovations();
    List<InnovationSummaryResponse> getMyInnovations(UUID ownerId);
    List<InnovationSummaryResponse> getInnovationsBySchool(UUID schoolId);
    
    // Status management
    void updateInnovationStatus(UUID id, String newStatus, String remarks, UUID userId);
}

package ac.suza.ims.innovation.dto;

import ac.suza.ims.innovation.entity.InnovationLevel;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.entity.InnovationType;
import ac.suza.ims.organization.dto.DepartmentResponse;
import ac.suza.ims.organization.dto.InnovationHubResponse;
import ac.suza.ims.organization.dto.SchoolResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationResponse {
    private UUID id;
    private String innovationCode;
    private String title;
    private String abstractText;
    private String problemStatement;
    private String proposedSolution;
    private String objectives;
    private String expectedImpact;
    private String targetBeneficiaries;
    
    private InnovationLevel innovationLevel;
    private InnovationType innovationType;
    private InnovationStatus currentStatus;
    
    private LocalDateTime submissionDate;
    private LocalDateTime approvalDate;
    private String remarks;

    private UUID ownerId;
    private String ownerName;
    private String ownerEmail;

    private SchoolResponse school;
    private DepartmentResponse department;
    private InnovationHubResponse hub;
    private InnovationCategoryResponse category;
    
    private List<InnovationDocumentResponse> documents;
    private List<InnovationStatusHistoryResponse> statusHistory;
}

package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpportunityDocumentResponse {

    private UUID id;
    private UUID applicationId;
    private String documentName;
    private DocumentType documentType;
    private String storagePath;
    private LocalDate uploadDate;
}

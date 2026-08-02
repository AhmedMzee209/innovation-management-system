package ac.suza.ims.document.dto;

import ac.suza.ims.document.entity.DocumentAction;
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
public class DocumentAuditResponse {

    private UUID id;
    private UUID documentId;
    private DocumentAction action;
    private LocalDate performedDate;
    private String ipAddress;
    private String device;
    private UUID performedById;
    private String performedByName;
}

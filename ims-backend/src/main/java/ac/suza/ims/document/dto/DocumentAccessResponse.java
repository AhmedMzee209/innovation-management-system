package ac.suza.ims.document.dto;

import ac.suza.ims.document.entity.AccessType;
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
public class DocumentAccessResponse {

    private UUID id;
    private UUID documentId;
    private UUID userId;
    private String userName;
    private AccessType accessType;
    private LocalDate grantedDate;
    private LocalDate expiresAt;
}

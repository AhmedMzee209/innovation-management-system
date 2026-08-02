package ac.suza.ims.document.dto;

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
public class DocumentVersionResponse {

    private UUID id;
    private UUID documentId;
    private Integer versionNumber;
    private String storedFileName;
    private String storagePath;
    private String checksum;
    private LocalDate uploadedDate;
    private UUID uploadedById;
    private String uploadedByName;
}

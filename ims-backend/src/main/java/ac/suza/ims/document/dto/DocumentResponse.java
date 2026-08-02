package ac.suza.ims.document.dto;

import ac.suza.ims.document.entity.DocumentStatus;
import ac.suza.ims.document.entity.DocumentVisibility;
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
public class DocumentResponse {

    private UUID id;
    private String documentCode;
    private String title;
    private String description;
    private String originalFileName;
    private String storedFileName;
    private String storagePath;
    private String mimeType;
    private String fileExtension;
    private Long fileSize;
    private String checksum;
    private Integer versionNumber;
    private DocumentStatus status;
    private DocumentVisibility visibility;
    private LocalDate uploadDate;
    private LocalDate approvedDate;
    private String entityType;
    private UUID entityId;
    private UUID categoryId;
    private String categoryName;
}

package ac.suza.ims.innovation.dto;

import ac.suza.ims.innovation.entity.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationDocumentResponse {
    private UUID id;
    private String documentName;
    private String originalFileName;
    private String fileType;
    private Long fileSize;
    private String storagePath;
    private DocumentType documentType;
    private LocalDateTime uploadDate;
}

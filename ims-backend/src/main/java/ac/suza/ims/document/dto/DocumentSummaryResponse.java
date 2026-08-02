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
public class DocumentSummaryResponse {

    private UUID id;
    private String documentCode;
    private String title;
    private String originalFileName;
    private String categoryName;
    private Long fileSize;
    private Integer versionNumber;
    private DocumentStatus status;
    private DocumentVisibility visibility;
    private LocalDate uploadDate;
}

package ac.suza.ims.document.dto;

import ac.suza.ims.document.entity.DocumentStatus;
import ac.suza.ims.document.entity.DocumentVisibility;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDocumentRequest {

    @Size(max = 255)
    private String title;

    private String description;

    private UUID categoryId;

    private DocumentVisibility visibility;

    private DocumentStatus status;
}

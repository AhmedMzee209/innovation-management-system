package ac.suza.ims.document.dto;

import ac.suza.ims.document.entity.DocumentVisibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class UploadDocumentRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @NotNull(message = "Category ID is mandatory")
    private UUID categoryId;

    private DocumentVisibility visibility;

    @Size(max = 100)
    private String entityType;

    private UUID entityId;
}

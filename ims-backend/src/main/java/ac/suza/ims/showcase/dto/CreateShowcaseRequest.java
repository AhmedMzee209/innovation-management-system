package ac.suza.ims.showcase.dto;

import ac.suza.ims.showcase.entity.ShowcaseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateShowcaseRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Summary is required")
    private String summary;
    
    private String description;
    
    @NotNull(message = "Category is required")
    private UUID categoryId;
    
    private UUID innovationId;
    
    private UUID startupId;
    
    private boolean featured;
    private boolean published;
    private ShowcaseStatus status;
    
    private String seoTitle;
    private String seoDescription;
    private String seoKeywords;
}

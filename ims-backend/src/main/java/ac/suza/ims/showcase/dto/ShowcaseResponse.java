package ac.suza.ims.showcase.dto;

import ac.suza.ims.showcase.entity.ShowcaseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowcaseResponse {
    private UUID id;
    private String showcaseCode;
    private String title;
    private String slug;
    private String summary;
    private String description;
    private boolean featured;
    private boolean published;
    private LocalDateTime publishedDate;
    private ShowcaseStatus status;
    private String seoTitle;
    private String seoDescription;
    private String seoKeywords;
    
    private String categoryName;
    private UUID categoryId;
    private String categoryIcon;
    private String categoryColor;
    
    private UUID innovationId;
    private String innovationCode;
    
    private UUID startupId;
    private String startupName;
    
    private List<MediaResponse> media;
}

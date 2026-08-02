package ac.suza.ims.showcase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowcaseSummaryResponse {
    private UUID id;
    private String showcaseCode;
    private String title;
    private String slug;
    private String summary;
    private boolean featured;
    private LocalDateTime publishedDate;
    private String categoryName;
    private String categoryColor;
    private String categoryIcon;
    private String thumbnailUrl;
}

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
public class SuccessStoryResponse {
    private UUID id;
    private String title;
    private String summary;
    private String story;
    private String achievement;
    private String featuredImage;
    private LocalDateTime publishDate;
    private boolean featured;
    
    private UUID startupId;
    private String startupName;
}

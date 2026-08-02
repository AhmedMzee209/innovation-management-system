package ac.suza.ims.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityResponse {

    private String id;
    private String activityType;
    private String title;
    private String description;
    private String performedBy;
    private LocalDateTime timestamp;
}

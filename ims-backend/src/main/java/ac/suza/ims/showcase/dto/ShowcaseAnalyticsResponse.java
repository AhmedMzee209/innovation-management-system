package ac.suza.ims.showcase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowcaseAnalyticsResponse {
    private Long pageViews;
    private Long uniqueVisitors;
    private Long downloads;
    private Long shares;
    private Long likes;
    private Long comments;
    private LocalDate analyticsDate;
}

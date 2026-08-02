package ac.suza.ims.dashboard.dto;

import ac.suza.ims.dashboard.entity.DashboardRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private UUID layoutId;
    private String layoutName;
    private DashboardRole userRole;
    private String description;
    private List<WidgetResponse> widgets;
    private StatisticsResponse summaryStatistics;
    private List<RecentActivityResponse> recentActivities;
}

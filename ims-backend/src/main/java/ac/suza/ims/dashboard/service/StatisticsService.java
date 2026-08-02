package ac.suza.ims.dashboard.service;

import ac.suza.ims.dashboard.dto.RecentActivityResponse;
import ac.suza.ims.dashboard.dto.StatisticsResponse;

import java.util.List;

public interface StatisticsService {

    StatisticsResponse getGlobalStatistics();

    List<RecentActivityResponse> getRecentActivities();
}

package ac.suza.ims.dashboard.service;

import ac.suza.ims.dashboard.dto.AnalyticsResponse;

public interface AnalyticsService {

    AnalyticsResponse getAnalyticsData();

    void captureDailySnapshot();
}

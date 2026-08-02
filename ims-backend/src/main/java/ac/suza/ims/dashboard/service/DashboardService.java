package ac.suza.ims.dashboard.service;

import ac.suza.ims.dashboard.dto.DashboardResponse;
import ac.suza.ims.dashboard.entity.DashboardRole;

public interface DashboardService {

    DashboardResponse getDashboardForRole(DashboardRole role);

    DashboardResponse getCurrentUserDashboard();
}

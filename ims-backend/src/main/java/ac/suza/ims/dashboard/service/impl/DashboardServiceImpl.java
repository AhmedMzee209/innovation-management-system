package ac.suza.ims.dashboard.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.dashboard.dto.DashboardResponse;
import ac.suza.ims.dashboard.dto.RecentActivityResponse;
import ac.suza.ims.dashboard.dto.StatisticsResponse;
import ac.suza.ims.dashboard.dto.WidgetResponse;
import ac.suza.ims.dashboard.entity.DashboardLayout;
import ac.suza.ims.dashboard.entity.DashboardRole;
import ac.suza.ims.dashboard.entity.DashboardWidget;
import ac.suza.ims.dashboard.mapper.DashboardMapper;
import ac.suza.ims.dashboard.mapper.WidgetMapper;
import ac.suza.ims.dashboard.repository.DashboardLayoutRepository;
import ac.suza.ims.dashboard.repository.DashboardWidgetRepository;
import ac.suza.ims.dashboard.service.DashboardService;
import ac.suza.ims.dashboard.service.StatisticsService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DashboardLayoutRepository layoutRepository;
    private final DashboardWidgetRepository widgetRepository;
    private final StatisticsService statisticsService;
    private final UserRepository userRepository;
    private final DashboardMapper dashboardMapper;
    private final WidgetMapper widgetMapper;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboardForRole(DashboardRole role) {
        log.info("Generating role-specific dashboard for role: {}", role);

        DashboardLayout layout = layoutRepository.findByUserRoleAndIsDefaultTrue(role)
                .orElseGet(() -> createDefaultLayout(role));

        List<DashboardWidget> widgets = widgetRepository.findByLayoutIdAndActiveTrueOrderByDisplayOrderAsc(layout.getId());
        List<WidgetResponse> widgetResponses = widgets.stream()
                .map(widgetMapper::toResponse)
                .collect(Collectors.toList());

        StatisticsResponse summaryStats = statisticsService.getGlobalStatistics();
        List<RecentActivityResponse> activities = statisticsService.getRecentActivities();

        DashboardResponse response = dashboardMapper.toResponse(layout);
        response.setWidgets(widgetResponses);
        response.setSummaryStatistics(summaryStats);
        response.setRecentActivities(activities);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getCurrentUserDashboard() {
        User currentUser = getCurrentUser();
        DashboardRole role = determineDashboardRole(currentUser);
        log.info("Resolved dashboard role {} for current user: {}", role, currentUser.getEmail());
        return getDashboardForRole(role);
    }

    private DashboardLayout createDefaultLayout(DashboardRole role) {
        DashboardLayout layout = DashboardLayout.builder()
                .layoutName(role.name() + " Executive Dashboard")
                .userRole(role)
                .isDefault(true)
                .description("Default " + role.name() + " enterprise analytics dashboard")
                .build();
        return layoutRepository.save(layout);
    }

    private DashboardRole determineDashboardRole(User user) {
        String roleName = user.getRoles().stream().findFirst().map(r -> r.getName().name()).orElse("STUDENT");
        switch (roleName) {
            case "SUPER_ADMIN":
                return DashboardRole.SUPER_ADMIN;
            case "INNOVATION_DIRECTOR":
                return DashboardRole.DIRECTOR;
            case "CENTRAL_INNOVATION_MANAGER":
                return DashboardRole.CENTRAL_MANAGER;
            case "SCHOOL_INNOVATION_MANAGER":
                return DashboardRole.SCHOOL_MANAGER;
            case "MENTOR":
                return DashboardRole.MENTOR;
            case "REVIEWER":
                return DashboardRole.REVIEWER;
            default:
                return DashboardRole.STUDENT;
        }
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}

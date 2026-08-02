package ac.suza.ims.dashboard.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.dashboard.dto.DashboardResponse;
import ac.suza.ims.dashboard.dto.RecentActivityResponse;
import ac.suza.ims.dashboard.entity.DashboardRole;
import ac.suza.ims.dashboard.service.DashboardService;
import ac.suza.ims.dashboard.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Endpoints for role-based executive dashboards and activity feeds")
public class DashboardController {

    private final DashboardService dashboardService;
    private final StatisticsService statisticsService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get current authenticated user's role-specific dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getCurrentUserDashboard() {
        DashboardResponse response = dashboardService.getCurrentUserDashboard();
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully", response));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Get Super Admin / Central Manager dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getAdminDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.SUPER_ADMIN);
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard retrieved successfully", response));
    }

    @GetMapping("/director")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_INNOVATION_DIRECTOR')")
    @Operation(summary = "Get Innovation Director executive dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getDirectorDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.DIRECTOR);
        return ResponseEntity.ok(ApiResponse.success("Director dashboard retrieved successfully", response));
    }

    @GetMapping("/school")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Get School Innovation Manager dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getSchoolDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.SCHOOL_MANAGER);
        return ResponseEntity.ok(ApiResponse.success("School dashboard retrieved successfully", response));
    }

    @GetMapping("/student")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get Student innovator dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getStudentDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.STUDENT);
        return ResponseEntity.ok(ApiResponse.success("Student dashboard retrieved successfully", response));
    }

    @GetMapping("/mentor")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Get Mentor dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getMentorDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.MENTOR);
        return ResponseEntity.ok(ApiResponse.success("Mentor dashboard retrieved successfully", response));
    }

    @GetMapping("/reviewer")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_REVIEWER')")
    @Operation(summary = "Get Reviewer dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getReviewerDashboard() {
        DashboardResponse response = dashboardService.getDashboardForRole(DashboardRole.REVIEWER);
        return ResponseEntity.ok(ApiResponse.success("Reviewer dashboard retrieved successfully", response));
    }

    @GetMapping("/recent-activities")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get recent activity stream")
    public ResponseEntity<ApiResponse<List<RecentActivityResponse>>> getRecentActivities() {
        List<RecentActivityResponse> response = statisticsService.getRecentActivities();
        return ResponseEntity.ok(ApiResponse.success("Recent activities retrieved successfully", response));
    }
}

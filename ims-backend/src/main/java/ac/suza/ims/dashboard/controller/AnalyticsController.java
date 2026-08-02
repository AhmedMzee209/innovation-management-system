package ac.suza.ims.dashboard.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.dashboard.dto.AnalyticsResponse;
import ac.suza.ims.dashboard.dto.StatisticsResponse;
import ac.suza.ims.dashboard.service.AnalyticsService;
import ac.suza.ims.dashboard.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Analytics & Statistics", description = "Endpoints for enterprise statistics aggregation and time-series analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final StatisticsService statisticsService;

    @GetMapping("/analytics")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_INNOVATION_DIRECTOR') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Get historical analytics time-series and comparative metrics")
    public ResponseEntity<ApiResponse<AnalyticsResponse>> getAnalytics() {
        AnalyticsResponse response = analyticsService.getAnalyticsData();
        return ResponseEntity.ok(ApiResponse.success("Analytics data retrieved successfully", response));
    }

    @GetMapping("/statistics")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get real-time system statistics")
    public ResponseEntity<ApiResponse<StatisticsResponse>> getStatistics() {
        StatisticsResponse response = statisticsService.getGlobalStatistics();
        return ResponseEntity.ok(ApiResponse.success("System statistics retrieved successfully", response));
    }
}

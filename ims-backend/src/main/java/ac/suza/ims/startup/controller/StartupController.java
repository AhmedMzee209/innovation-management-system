package ac.suza.ims.startup.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.startup.dto.*;
import ac.suza.ims.startup.entity.StartupStatus;
import ac.suza.ims.startup.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/startups")
@RequiredArgsConstructor
@Tag(name = "Startups", description = "Startup Management & Progression APIs")
public class StartupController {

    private final StartupService startupService;
    private final StartupTeamMemberService teamMemberService;
    private final StartupStageService stageService;
    private final StartupMilestoneService milestoneService;
    private final StartupAchievementService achievementService;
    private final StartupProgressService progressService;

    // ==================== STARTUP CORE ====================

    @Operation(summary = "Create a new startup from an approved innovation")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<StartupResponse>> createStartup(@Valid @RequestBody CreateStartupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Startup created successfully", startupService.createStartup(request)));
    }

    @Operation(summary = "Get all startups (with optional filters)")
    @GetMapping
    public ResponseEntity<ApiResponse<List<StartupSummaryResponse>>> getStartups(
            @RequestParam(required = false) UUID schoolId,
            @RequestParam(required = false) UUID hubId,
            @RequestParam(required = false) UUID stageId,
            @RequestParam(required = false) StartupStatus status) {
        if (schoolId != null || hubId != null || stageId != null || status != null) {
            return ResponseEntity.ok(ApiResponse.success("Filtered startups fetched successfully",
                    startupService.filterStartups(schoolId, hubId, stageId, status)));
        }
        return ResponseEntity.ok(ApiResponse.success("Startups fetched successfully", startupService.getAllStartups()));
    }

    @Operation(summary = "Get startup by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StartupResponse>> getStartupById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Startup fetched successfully", startupService.getStartupById(id)));
    }

    @Operation(summary = "Update startup details")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StartupResponse>> updateStartup(
            @PathVariable UUID id, @Valid @RequestBody UpdateStartupRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Startup updated successfully", startupService.updateStartup(id, request)));
    }

    @Operation(summary = "Delete startup (soft delete)")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStartup(@PathVariable UUID id) {
        startupService.deleteStartup(id);
        return ResponseEntity.ok(ApiResponse.noContent("Startup deleted successfully"));
    }

    // ==================== STAGES ====================

    @Operation(summary = "Get all startup stages")
    @GetMapping("/stages")
    public ResponseEntity<ApiResponse<List<StartupStageResponse>>> getAllStages() {
        return ResponseEntity.ok(ApiResponse.success("Startup stages fetched successfully", stageService.getAllStages()));
    }

    // ==================== TEAM MEMBERS ====================

    @Operation(summary = "Add a team member to a startup")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PostMapping("/{id}/team")
    public ResponseEntity<ApiResponse<StartupTeamMemberResponse>> addTeamMember(
            @PathVariable UUID id, @Valid @RequestBody StartupTeamMemberRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Team member added successfully", teamMemberService.addTeamMember(id, request)));
    }

    @Operation(summary = "Get team members of a startup")
    @GetMapping("/{id}/team")
    public ResponseEntity<ApiResponse<List<StartupTeamMemberResponse>>> getTeamMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Team members fetched successfully", teamMemberService.getTeamMembers(id)));
    }

    @Operation(summary = "Remove a team member from a startup")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @DeleteMapping("/{id}/team/{memberId}")
    public ResponseEntity<ApiResponse<Void>> removeTeamMember(
            @PathVariable UUID id, @PathVariable UUID memberId) {
        teamMemberService.removeTeamMember(id, memberId);
        return ResponseEntity.ok(ApiResponse.noContent("Team member removed successfully"));
    }

    // ==================== MILESTONES ====================

    @Operation(summary = "Add a milestone to a startup")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PostMapping("/{id}/milestones")
    public ResponseEntity<ApiResponse<StartupMilestoneResponse>> addMilestone(
            @PathVariable UUID id, @Valid @RequestBody StartupMilestoneRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Milestone created successfully", milestoneService.addMilestone(id, request)));
    }

    @Operation(summary = "Get milestones of a startup")
    @GetMapping("/{id}/milestones")
    public ResponseEntity<ApiResponse<List<StartupMilestoneResponse>>> getMilestones(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Milestones fetched successfully", milestoneService.getMilestones(id)));
    }

    // ==================== ACHIEVEMENTS ====================

    @Operation(summary = "Record an achievement for a startup")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PostMapping("/{id}/achievements")
    public ResponseEntity<ApiResponse<StartupAchievementResponse>> addAchievement(
            @PathVariable UUID id, @Valid @RequestBody StartupAchievementRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Achievement recorded successfully", achievementService.addAchievement(id, request)));
    }

    @Operation(summary = "Get achievements of a startup")
    @GetMapping("/{id}/achievements")
    public ResponseEntity<ApiResponse<List<StartupAchievementResponse>>> getAchievements(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Achievements fetched successfully", achievementService.getAchievements(id)));
    }

    // ==================== PROGRESS RECORDS ====================

    @Operation(summary = "Add a progress tracking record to a startup")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('STARTUP_MANAGE')")
    @PostMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<StartupProgressResponse>> addProgressRecord(
            @PathVariable UUID id, @Valid @RequestBody StartupProgressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Progress record added successfully", progressService.addProgressRecord(id, request)));
    }

    @Operation(summary = "Get progress tracking history of a startup")
    @GetMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<List<StartupProgressResponse>>> getProgressHistory(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Progress history fetched successfully", progressService.getProgressHistory(id)));
    }
}

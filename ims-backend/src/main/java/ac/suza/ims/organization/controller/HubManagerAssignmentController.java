package ac.suza.ims.organization.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.organization.dto.HubManagerAssignmentRequest;
import ac.suza.ims.organization.dto.HubManagerAssignmentResponse;
import ac.suza.ims.organization.service.HubManagerAssignmentService;
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
@RequestMapping("/api/hub-assignments")
@RequiredArgsConstructor
@Tag(name = "Hub Manager Assignments", description = "APIs for managing Innovation Hub manager assignments")
public class HubManagerAssignmentController {

    private final HubManagerAssignmentService assignmentService;

    @Operation(summary = "Assign a manager to a hub")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<HubManagerAssignmentResponse>> assignManager(
            @Valid @RequestBody HubManagerAssignmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Manager assigned successfully", assignmentService.assignManager(request)));
    }

    @Operation(summary = "Unassign (deactivate) a manager from a hub")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PutMapping("/{assignmentId}/unassign")
    public ResponseEntity<ApiResponse<HubManagerAssignmentResponse>> unassignManager(@PathVariable UUID assignmentId) {
        return ResponseEntity.ok(ApiResponse.success("Manager unassigned successfully",
                assignmentService.unassignManager(assignmentId)));
    }

    @Operation(summary = "Get all assignments for a hub (including history)")
    @GetMapping("/hub/{hubId}")
    public ResponseEntity<ApiResponse<List<HubManagerAssignmentResponse>>> getAssignmentsByHub(@PathVariable UUID hubId) {
        return ResponseEntity.ok(ApiResponse.success("Assignments fetched successfully",
                assignmentService.getAssignmentsByHub(hubId)));
    }

    @Operation(summary = "Get only active managers for a hub")
    @GetMapping("/hub/{hubId}/active")
    public ResponseEntity<ApiResponse<List<HubManagerAssignmentResponse>>> getActiveManagersByHub(@PathVariable UUID hubId) {
        return ResponseEntity.ok(ApiResponse.success("Active managers fetched successfully",
                assignmentService.getActiveManagersByHub(hubId)));
    }
}

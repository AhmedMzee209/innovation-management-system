package ac.suza.ims.auth.controller;

import ac.suza.ims.auth.dto.PermissionResponse;
import ac.suza.ims.auth.service.PermissionService;
import ac.suza.ims.common.response.ApiResponse;
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
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@Tag(name = "Permissions", description = "Permission Management APIs")
public class PermissionController {

    private final PermissionService permissionService;

    @Operation(summary = "Get all permissions")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MANAGE') or hasAuthority('PERMISSION_MANAGE')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> getAllPermissions() {
        return ResponseEntity.ok(ApiResponse.success(
                "Permissions fetched successfully",
                permissionService.getAllPermissions()
        ));
    }
}

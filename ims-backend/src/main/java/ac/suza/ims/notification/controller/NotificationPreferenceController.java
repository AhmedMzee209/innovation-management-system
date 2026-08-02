package ac.suza.ims.notification.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.notification.dto.NotificationPreferenceRequest;
import ac.suza.ims.notification.dto.NotificationPreferenceResponse;
import ac.suza.ims.notification.service.NotificationPreferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
@RequiredArgsConstructor
@Tag(name = "Notification Preferences", description = "Endpoints for managing personal notification delivery preferences")
public class NotificationPreferenceController {

    private final NotificationPreferenceService preferenceService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get current user's notification preferences")
    public ResponseEntity<ApiResponse<NotificationPreferenceResponse>> getPreferences() {
        NotificationPreferenceResponse response = preferenceService.getCurrentUserPreferences();
        return ResponseEntity.ok(ApiResponse.success("Notification preferences retrieved successfully", response));
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Update current user's notification preferences")
    public ResponseEntity<ApiResponse<NotificationPreferenceResponse>> updatePreferences(@Valid @RequestBody NotificationPreferenceRequest request) {
        NotificationPreferenceResponse response = preferenceService.updateCurrentUserPreferences(request);
        return ResponseEntity.ok(ApiResponse.success("Notification preferences updated successfully", response));
    }
}

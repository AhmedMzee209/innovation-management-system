package ac.suza.ims.dashboard.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.dashboard.dto.SavedFilterRequest;
import ac.suza.ims.dashboard.dto.SavedFilterResponse;
import ac.suza.ims.dashboard.service.SavedFilterService;
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
@RequestMapping("/api/saved-filters")
@RequiredArgsConstructor
@Tag(name = "Saved Filters", description = "Endpoints for saving and retrieving custom user search and filter presets")
public class SavedFilterController {

    private final SavedFilterService filterService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Save a new custom filter preset")
    public ResponseEntity<ApiResponse<SavedFilterResponse>> createFilter(@Valid @RequestBody SavedFilterRequest request) {
        SavedFilterResponse response = filterService.createFilter(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Saved filter created successfully", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get current user's saved filters, optionally filtered by module")
    public ResponseEntity<ApiResponse<List<SavedFilterResponse>>> getFilters(@RequestParam(required = false) String module) {
        List<SavedFilterResponse> response = filterService.getCurrentUserFilters(module);
        return ResponseEntity.ok(ApiResponse.success("Saved filters retrieved successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Delete a saved filter preset")
    public ResponseEntity<ApiResponse<Void>> deleteFilter(@PathVariable UUID id) {
        filterService.deleteFilter(id);
        return ResponseEntity.ok(ApiResponse.success("Saved filter deleted successfully", null));
    }
}

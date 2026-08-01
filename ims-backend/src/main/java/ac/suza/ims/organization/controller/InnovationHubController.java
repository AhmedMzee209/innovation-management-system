package ac.suza.ims.organization.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.organization.dto.InnovationHubRequest;
import ac.suza.ims.organization.dto.InnovationHubResponse;
import ac.suza.ims.organization.service.InnovationHubService;
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
@RequestMapping("/api/hubs")
@RequiredArgsConstructor
@Tag(name = "Innovation Hubs", description = "Innovation Hub Management APIs")
public class InnovationHubController {

    private final InnovationHubService hubService;

    @Operation(summary = "Get all hubs")
    @GetMapping
    public ResponseEntity<ApiResponse<List<InnovationHubResponse>>> getAllHubs() {
        return ResponseEntity.ok(ApiResponse.success("Hubs fetched successfully", hubService.getAllHubs()));
    }

    @Operation(summary = "Get hubs by school")
    @GetMapping("/school/{schoolId}")
    public ResponseEntity<ApiResponse<List<InnovationHubResponse>>> getHubsBySchool(@PathVariable UUID schoolId) {
        return ResponseEntity.ok(ApiResponse.success("Hubs fetched successfully", hubService.getHubsBySchool(schoolId)));
    }

    @Operation(summary = "Get hub by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationHubResponse>> getHubById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Hub fetched successfully", hubService.getHubById(id)));
    }

    @Operation(summary = "Create a new hub")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<InnovationHubResponse>> createHub(@Valid @RequestBody InnovationHubRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Hub created successfully", hubService.createHub(request)));
    }

    @Operation(summary = "Update a hub")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationHubResponse>> updateHub(
            @PathVariable UUID id, @Valid @RequestBody InnovationHubRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Hub updated successfully", hubService.updateHub(id, request)));
    }

    @Operation(summary = "Delete a hub")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHub(@PathVariable UUID id) {
        hubService.deleteHub(id);
        return ResponseEntity.ok(ApiResponse.noContent("Hub deleted successfully"));
    }
}

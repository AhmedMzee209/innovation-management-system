package ac.suza.ims.showcase.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.showcase.dto.CreateShowcaseRequest;
import ac.suza.ims.showcase.dto.ShowcaseResponse;
import ac.suza.ims.showcase.dto.UpdateShowcaseRequest;
import ac.suza.ims.showcase.service.ShowcaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/showcase")
@RequiredArgsConstructor
@Tag(name = "Showcase Management", description = "Admin endpoints for managing public showcase content")
public class ShowcaseAdminController {

    private final ShowcaseService showcaseService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Publish a new innovation or startup to the showcase")
    public ResponseEntity<ApiResponse<ShowcaseResponse>> createShowcaseItem(@Valid @RequestBody CreateShowcaseRequest request) {
        ShowcaseResponse response = showcaseService.createShowcaseItem(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Showcase item published successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Update an existing showcase item")
    public ResponseEntity<ApiResponse<ShowcaseResponse>> updateShowcaseItem(
            @PathVariable UUID id, @Valid @RequestBody UpdateShowcaseRequest request) {
        ShowcaseResponse response = showcaseService.updateShowcaseItem(id, request);
        return ResponseEntity.ok(ApiResponse.success("Showcase item updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Remove an item from the public showcase")
    public ResponseEntity<ApiResponse<Void>> deleteShowcaseItem(@PathVariable UUID id) {
        showcaseService.deleteShowcaseItem(id);
        return ResponseEntity.ok(ApiResponse.success("Showcase item removed successfully", null));
    }
}

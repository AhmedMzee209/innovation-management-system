package ac.suza.ims.innovation.controller;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.innovation.dto.CreateInnovationRequest;
import ac.suza.ims.innovation.dto.InnovationResponse;
import ac.suza.ims.innovation.dto.InnovationSummaryResponse;
import ac.suza.ims.innovation.dto.UpdateInnovationRequest;
import ac.suza.ims.innovation.service.InnovationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/innovations")
@RequiredArgsConstructor
@Tag(name = "Innovations", description = "Innovation Lifecycle Management APIs")
public class InnovationController {

    private final InnovationService innovationService;

    @Operation(summary = "Submit a new innovation")
    @PostMapping
    public ResponseEntity<ApiResponse<InnovationResponse>> createInnovation(
            @Valid @RequestBody CreateInnovationRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Innovation submitted successfully", 
                        innovationService.createInnovation(request, currentUser.getId())));
    }

    @Operation(summary = "Update an innovation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationResponse>> updateInnovation(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateInnovationRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.success("Innovation updated successfully", 
                innovationService.updateInnovation(id, request, currentUser.getId())));
    }

    @Operation(summary = "Delete an innovation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInnovation(
            @PathVariable UUID id,
            @AuthenticationPrincipal User currentUser) {
        innovationService.deleteInnovation(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.noContent("Innovation deleted successfully"));
    }

    @Operation(summary = "Get innovation by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationResponse>> getInnovationById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Innovation fetched successfully", 
                innovationService.getInnovationById(id)));
    }

    @Operation(summary = "Get all innovations (Admin)")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('INNOVATION_VIEW_ALL')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<InnovationSummaryResponse>>> getAllInnovations() {
        return ResponseEntity.ok(ApiResponse.success("Innovations fetched successfully", 
                innovationService.getAllInnovations()));
    }

    @Operation(summary = "Get my innovations")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<InnovationSummaryResponse>>> getMyInnovations(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.success("My innovations fetched successfully", 
                innovationService.getMyInnovations(currentUser.getId())));
    }
}

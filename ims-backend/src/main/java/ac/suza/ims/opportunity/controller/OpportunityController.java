package ac.suza.ims.opportunity.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.opportunity.dto.*;
import ac.suza.ims.opportunity.service.OpportunityApplicationService;
import ac.suza.ims.opportunity.service.OpportunityCategoryService;
import ac.suza.ims.opportunity.service.OpportunityService;
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
@RequestMapping("/api/opportunities")
@RequiredArgsConstructor
@Tag(name = "Opportunities", description = "Endpoints for managing innovator & startup opportunities, categories, and applications")
public class OpportunityController {

    private final OpportunityService opportunityService;
    private final OpportunityCategoryService categoryService;
    private final OpportunityApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Create a new opportunity")
    public ResponseEntity<ApiResponse<OpportunityResponse>> createOpportunity(@Valid @RequestBody CreateOpportunityRequest request) {
        OpportunityResponse response = opportunityService.createOpportunity(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Opportunity created successfully", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all opportunities summary list")
    public ResponseEntity<ApiResponse<List<OpportunitySummaryResponse>>> getAllOpportunities() {
        List<OpportunitySummaryResponse> response = opportunityService.getAllOpportunities();
        return ResponseEntity.ok(ApiResponse.success("Opportunities retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get detailed opportunity by ID")
    public ResponseEntity<ApiResponse<OpportunityResponse>> getOpportunityById(@PathVariable UUID id) {
        OpportunityResponse response = opportunityService.getOpportunityById(id);
        return ResponseEntity.ok(ApiResponse.success("Opportunity retrieved successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Update opportunity details")
    public ResponseEntity<ApiResponse<OpportunityResponse>> updateOpportunity(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateOpportunityRequest request) {
        OpportunityResponse response = opportunityService.updateOpportunity(id, request);
        return ResponseEntity.ok(ApiResponse.success("Opportunity updated successfully", response));
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Publish opportunity to OPEN status")
    public ResponseEntity<ApiResponse<OpportunityResponse>> publishOpportunity(@PathVariable UUID id) {
        OpportunityResponse response = opportunityService.publishOpportunity(id);
        return ResponseEntity.ok(ApiResponse.success("Opportunity published successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Delete opportunity")
    public ResponseEntity<ApiResponse<Void>> deleteOpportunity(@PathVariable UUID id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.ok(ApiResponse.success("Opportunity deleted successfully", null));
    }

    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_STUDENT')")
    @Operation(summary = "Apply for an opportunity")
    public ResponseEntity<ApiResponse<OpportunityApplicationResponse>> applyForOpportunity(
            @PathVariable UUID id,
            @Valid @RequestBody OpportunityApplicationRequest request) {
        request.setOpportunityId(id);
        OpportunityApplicationResponse response = applicationService.applyForOpportunity(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Application submitted successfully", response));
    }

    @GetMapping("/applications")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get applications by opportunity or startup ID")
    public ResponseEntity<ApiResponse<List<OpportunityApplicationResponse>>> getApplications(
            @RequestParam(required = false) UUID opportunityId,
            @RequestParam(required = false) UUID startupId) {
        List<OpportunityApplicationResponse> response;
        if (opportunityId != null) {
            response = applicationService.getApplicationsByOpportunity(opportunityId);
        } else if (startupId != null) {
            response = applicationService.getApplicationsByStartup(startupId);
        } else {
            response = List.of();
        }
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", response));
    }

    @GetMapping("/categories")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all opportunity categories")
    public ResponseEntity<ApiResponse<List<OpportunityCategoryResponse>>> getCategories() {
        List<OpportunityCategoryResponse> response = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", response));
    }
}

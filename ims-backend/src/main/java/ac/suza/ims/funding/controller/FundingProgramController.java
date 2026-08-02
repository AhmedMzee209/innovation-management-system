package ac.suza.ims.funding.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.funding.dto.CreateFundingProgramRequest;
import ac.suza.ims.funding.dto.FundingProgramResponse;
import ac.suza.ims.funding.service.FundingProgramService;
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
@RequestMapping("/api/funding-programs")
@RequiredArgsConstructor
@Tag(name = "Funding Programs", description = "Endpoints for creating, publishing, and managing funding opportunities")
public class FundingProgramController {

    private final FundingProgramService programService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Create a new funding program")
    public ResponseEntity<ApiResponse<FundingProgramResponse>> createFundingProgram(@Valid @RequestBody CreateFundingProgramRequest request) {
        FundingProgramResponse response = programService.createFundingProgram(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Funding program created successfully", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all funding programs")
    public ResponseEntity<ApiResponse<List<FundingProgramResponse>>> getAllFundingPrograms() {
        List<FundingProgramResponse> response = programService.getAllFundingPrograms();
        return ResponseEntity.ok(ApiResponse.success("Funding programs retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get funding program by ID")
    public ResponseEntity<ApiResponse<FundingProgramResponse>> getFundingProgramById(@PathVariable UUID id) {
        FundingProgramResponse response = programService.getFundingProgramById(id);
        return ResponseEntity.ok(ApiResponse.success("Funding program retrieved successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Update funding program")
    public ResponseEntity<ApiResponse<FundingProgramResponse>> updateFundingProgram(
            @PathVariable UUID id,
            @Valid @RequestBody CreateFundingProgramRequest request) {
        FundingProgramResponse response = programService.updateFundingProgram(id, request);
        return ResponseEntity.ok(ApiResponse.success("Funding program updated successfully", response));
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Publish a funding program to OPEN state")
    public ResponseEntity<ApiResponse<FundingProgramResponse>> publishFundingProgram(@PathVariable UUID id) {
        FundingProgramResponse response = programService.publishFundingProgram(id);
        return ResponseEntity.ok(ApiResponse.success("Funding program published successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Delete funding program")
    public ResponseEntity<ApiResponse<Void>> deleteFundingProgram(@PathVariable UUID id) {
        programService.deleteFundingProgram(id);
        return ResponseEntity.ok(ApiResponse.success("Funding program deleted successfully", null));
    }
}

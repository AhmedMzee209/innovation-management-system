package ac.suza.ims.competition.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.competition.dto.CompetitionRegistrationRequest;
import ac.suza.ims.competition.dto.CompetitionRegistrationResponse;
import ac.suza.ims.competition.dto.CompetitionResponse;
import ac.suza.ims.competition.dto.CreateCompetitionRequest;
import ac.suza.ims.competition.service.CompetitionRegistrationService;
import ac.suza.ims.competition.service.CompetitionService;
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
@RequestMapping("/api/competitions")
@RequiredArgsConstructor
@Tag(name = "Competitions", description = "Endpoints for managing university innovation competitions and registrations")
public class CompetitionController {

    private final CompetitionService competitionService;
    private final CompetitionRegistrationService registrationService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Create a new competition")
    public ResponseEntity<ApiResponse<CompetitionResponse>> createCompetition(@Valid @RequestBody CreateCompetitionRequest request) {
        CompetitionResponse response = competitionService.createCompetition(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Competition created successfully", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all competitions")
    public ResponseEntity<ApiResponse<List<CompetitionResponse>>> getAllCompetitions() {
        List<CompetitionResponse> response = competitionService.getAllCompetitions();
        return ResponseEntity.ok(ApiResponse.success("Competitions retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get competition by ID")
    public ResponseEntity<ApiResponse<CompetitionResponse>> getCompetitionById(@PathVariable UUID id) {
        CompetitionResponse response = competitionService.getCompetitionById(id);
        return ResponseEntity.ok(ApiResponse.success("Competition retrieved successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Update competition details")
    public ResponseEntity<ApiResponse<CompetitionResponse>> updateCompetition(
            @PathVariable UUID id,
            @Valid @RequestBody CreateCompetitionRequest request) {
        CompetitionResponse response = competitionService.updateCompetition(id, request);
        return ResponseEntity.ok(ApiResponse.success("Competition updated successfully", response));
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Publish competition to OPEN state")
    public ResponseEntity<ApiResponse<CompetitionResponse>> publishCompetition(@PathVariable UUID id) {
        CompetitionResponse response = competitionService.publishCompetition(id);
        return ResponseEntity.ok(ApiResponse.success("Competition published successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Delete competition")
    public ResponseEntity<ApiResponse<Void>> deleteCompetition(@PathVariable UUID id) {
        competitionService.deleteCompetition(id);
        return ResponseEntity.ok(ApiResponse.success("Competition deleted successfully", null));
    }

    @PostMapping("/{id}/register")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_STUDENT')")
    @Operation(summary = "Register startup for competition")
    public ResponseEntity<ApiResponse<CompetitionRegistrationResponse>> registerStartup(
            @PathVariable UUID id,
            @Valid @RequestBody CompetitionRegistrationRequest request) {
        request.setCompetitionId(id);
        CompetitionRegistrationResponse response = registrationService.registerStartup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Startup registered successfully for competition", response));
    }

    @GetMapping("/{id}/registrations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all registrations for a competition")
    public ResponseEntity<ApiResponse<List<CompetitionRegistrationResponse>>> getRegistrations(@PathVariable UUID id) {
        List<CompetitionRegistrationResponse> response = registrationService.getRegistrationsByCompetition(id);
        return ResponseEntity.ok(ApiResponse.success("Registrations retrieved successfully", response));
    }
}

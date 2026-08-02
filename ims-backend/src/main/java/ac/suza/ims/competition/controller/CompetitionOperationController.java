package ac.suza.ims.competition.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.competition.dto.*;
import ac.suza.ims.competition.service.CompetitionEvaluationService;
import ac.suza.ims.competition.service.CompetitionResultService;
import ac.suza.ims.competition.service.PrizeService;
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
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Competition Evaluations & Results", description = "Endpoints for startup evaluations, rankings, results, and prizes")
public class CompetitionOperationController {

    private final CompetitionEvaluationService evaluationService;
    private final CompetitionResultService resultService;
    private final PrizeService prizeService;

    @PostMapping("/competition-evaluations")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_JUDGE') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Submit multi-criteria evaluation for a startup registration")
    public ResponseEntity<ApiResponse<CompetitionEvaluationResponse>> evaluateStartup(@Valid @RequestBody CompetitionEvaluationRequest request) {
        CompetitionEvaluationResponse response = evaluationService.evaluateStartup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Evaluation submitted successfully", response));
    }

    @GetMapping("/competition-evaluations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get evaluations by registration ID")
    public ResponseEntity<ApiResponse<List<CompetitionEvaluationResponse>>> getEvaluations(@RequestParam UUID registrationId) {
        List<CompetitionEvaluationResponse> response = evaluationService.getEvaluationsByRegistration(registrationId);
        return ResponseEntity.ok(ApiResponse.success("Evaluations retrieved successfully", response));
    }

    @PostMapping("/competitions/{id}/calculate-results")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Calculate and publish final rankings & results for a competition")
    public ResponseEntity<ApiResponse<List<CompetitionResultResponse>>> calculateAndPublishResults(@PathVariable UUID id) {
        List<CompetitionResultResponse> response = resultService.calculateAndPublishResults(id);
        return ResponseEntity.ok(ApiResponse.success("Competition results calculated and published successfully", response));
    }

    @GetMapping("/competition-results")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get official competition results")
    public ResponseEntity<ApiResponse<List<CompetitionResultResponse>>> getResults(@RequestParam UUID competitionId) {
        List<CompetitionResultResponse> response = resultService.getResultsByCompetition(competitionId);
        return ResponseEntity.ok(ApiResponse.success("Competition results retrieved successfully", response));
    }

    @PostMapping("/prizes")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Create prize allocation for a competition")
    public ResponseEntity<ApiResponse<PrizeResponse>> createPrize(@Valid @RequestBody PrizeRequest request) {
        PrizeResponse response = prizeService.createPrize(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Prize created successfully", response));
    }

    @GetMapping("/prizes")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get prizes by competition ID")
    public ResponseEntity<ApiResponse<List<PrizeResponse>>> getPrizes(@RequestParam UUID competitionId) {
        List<PrizeResponse> response = prizeService.getPrizesByCompetition(competitionId);
        return ResponseEntity.ok(ApiResponse.success("Prizes retrieved successfully", response));
    }
}

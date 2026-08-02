package ac.suza.ims.funding.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.funding.dto.*;
import ac.suza.ims.funding.entity.FundingApplicationStatus;
import ac.suza.ims.funding.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Funding Applications & Operations", description = "Endpoints for funding applications, evaluations, disbursements, milestones, and reports")
public class FundingApplicationController {

    private final FundingApplicationService applicationService;
    private final FundingEvaluationService evaluationService;
    private final FundingDisbursementService disbursementService;
    private final FundingMilestoneService milestoneService;
    private final FundingReportService reportService;

    // ─── Funding Application Endpoints ────────────────────────────────────────

    @PostMapping("/funding-applications")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_STUDENT')")
    @Operation(summary = "Apply for a funding program")
    public ResponseEntity<ApiResponse<FundingApplicationResponse>> applyForFunding(@Valid @RequestBody ApplyFundingRequest request) {
        FundingApplicationResponse response = applicationService.applyForFunding(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Funding application submitted successfully", response));
    }

    @GetMapping("/funding-applications")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get funding applications by startup or program")
    public ResponseEntity<ApiResponse<List<FundingApplicationResponse>>> getApplications(
            @RequestParam(required = false) UUID startupId,
            @RequestParam(required = false) UUID programId) {
        List<FundingApplicationResponse> response;
        if (startupId != null) {
            response = applicationService.getApplicationsByStartup(startupId);
        } else if (programId != null) {
            response = applicationService.getApplicationsByProgram(programId);
        } else {
            response = applicationService.getAllApplications();
        }
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", response));
    }

    @GetMapping("/funding-applications/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get funding application by ID")
    public ResponseEntity<ApiResponse<FundingApplicationResponse>> getApplicationById(@PathVariable UUID id) {
        FundingApplicationResponse response = applicationService.getApplicationById(id);
        return ResponseEntity.ok(ApiResponse.success("Application retrieved successfully", response));
    }

    @PutMapping("/funding-applications/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Update funding application status and approved amount")
    public ResponseEntity<ApiResponse<FundingApplicationResponse>> updateApplicationStatus(
            @PathVariable UUID id,
            @RequestParam FundingApplicationStatus status,
            @RequestParam(required = false) BigDecimal approvedAmount) {
        FundingApplicationResponse response = applicationService.updateApplicationStatus(id, status, approvedAmount);
        return ResponseEntity.ok(ApiResponse.success("Application status updated successfully", response));
    }

    // ─── Funding Evaluation Endpoints ────────────────────────────────────────

    @PostMapping("/funding-evaluations")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_FUNDING_COMMITTEE_MEMBER') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Submit a funding evaluation for an application")
    public ResponseEntity<ApiResponse<FundingEvaluationResponse>> evaluateApplication(@Valid @RequestBody FundingEvaluationRequest request) {
        FundingEvaluationResponse response = evaluationService.evaluateApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Funding evaluation submitted successfully", response));
    }

    @GetMapping("/funding-evaluations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get evaluations by application ID")
    public ResponseEntity<ApiResponse<List<FundingEvaluationResponse>>> getEvaluations(@RequestParam UUID applicationId) {
        List<FundingEvaluationResponse> response = evaluationService.getEvaluationsByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Evaluations retrieved successfully", response));
    }

    // ─── Funding Disbursement Endpoints ──────────────────────────────────────

    @PostMapping("/disbursements")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Record fund disbursement")
    public ResponseEntity<ApiResponse<FundingDisbursementResponse>> recordDisbursement(@Valid @RequestBody FundingDisbursementRequest request) {
        FundingDisbursementResponse response = disbursementService.recordDisbursement(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Disbursement recorded successfully", response));
    }

    @GetMapping("/disbursements")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get disbursements by application ID")
    public ResponseEntity<ApiResponse<List<FundingDisbursementResponse>>> getDisbursements(@RequestParam UUID applicationId) {
        List<FundingDisbursementResponse> response = disbursementService.getDisbursementsByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Disbursements retrieved successfully", response));
    }

    // ─── Funding Milestone Endpoints ─────────────────────────────────────────

    @PostMapping("/funding-milestones")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Create milestone for funding application")
    public ResponseEntity<ApiResponse<FundingMilestoneResponse>> createMilestone(@Valid @RequestBody FundingMilestoneRequest request) {
        FundingMilestoneResponse response = milestoneService.createMilestone(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Milestone created successfully", response));
    }

    @GetMapping("/funding-milestones")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get milestones by application ID")
    public ResponseEntity<ApiResponse<List<FundingMilestoneResponse>>> getMilestones(@RequestParam UUID applicationId) {
        List<FundingMilestoneResponse> response = milestoneService.getMilestonesByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Milestones retrieved successfully", response));
    }

    // ─── Funding Report Endpoints ────────────────────────────────────────────

    @PostMapping("/funding-reports")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_STUDENT')")
    @Operation(summary = "Submit funding utilization report")
    public ResponseEntity<ApiResponse<FundingReportResponse>> submitReport(@Valid @RequestBody FundingReportRequest request) {
        FundingReportResponse response = reportService.submitReport(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Report submitted successfully", response));
    }

    @GetMapping("/funding-reports")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get reports by application ID")
    public ResponseEntity<ApiResponse<List<FundingReportResponse>>> getReports(@RequestParam UUID applicationId) {
        List<FundingReportResponse> response = reportService.getReportsByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Reports retrieved successfully", response));
    }
}

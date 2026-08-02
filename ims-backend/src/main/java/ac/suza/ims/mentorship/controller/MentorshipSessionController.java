package ac.suza.ims.mentorship.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.mentorship.dto.*;
import ac.suza.ims.mentorship.entity.ActionPlanStatus;
import ac.suza.ims.mentorship.entity.SessionStatus;
import ac.suza.ims.mentorship.service.ActionPlanService;
import ac.suza.ims.mentorship.service.MentorFeedbackService;
import ac.suza.ims.mentorship.service.MentorshipEvaluationService;
import ac.suza.ims.mentorship.service.MentorshipSessionService;
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
@Tag(name = "Mentorship Sessions & Action Plans", description = "Endpoints for scheduling sessions, recording feedback, action plans, and evaluations")
public class MentorshipSessionController {

    private final MentorshipSessionService sessionService;
    private final MentorFeedbackService feedbackService;
    private final ActionPlanService actionPlanService;
    private final MentorshipEvaluationService evaluationService;

    // ─── Mentorship Session Endpoints ─────────────────────────────────────────

    @PostMapping("/sessions")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Schedule a mentorship session")
    public ResponseEntity<ApiResponse<SessionResponse>> scheduleSession(@Valid @RequestBody CreateSessionRequest request) {
        SessionResponse response = sessionService.scheduleSession(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Mentorship session scheduled successfully", response));
    }

    @GetMapping("/sessions")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get mentorship sessions by assignment, mentor, or startup")
    public ResponseEntity<ApiResponse<List<SessionResponse>>> getSessions(
            @RequestParam(required = false) UUID assignmentId,
            @RequestParam(required = false) UUID mentorId,
            @RequestParam(required = false) UUID startupId) {
        List<SessionResponse> sessions;
        if (assignmentId != null) {
            sessions = sessionService.getSessionsByAssignment(assignmentId);
        } else if (mentorId != null) {
            sessions = sessionService.getSessionsByMentor(mentorId);
        } else if (startupId != null) {
            sessions = sessionService.getSessionsByStartup(startupId);
        } else {
            sessions = List.of();
        }
        return ResponseEntity.ok(ApiResponse.success("Sessions retrieved successfully", sessions));
    }

    @PutMapping("/sessions/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Update session status and summary")
    public ResponseEntity<ApiResponse<SessionResponse>> updateSessionStatus(
            @PathVariable UUID id,
            @RequestParam SessionStatus status,
            @RequestParam(required = false) String summary) {
        SessionResponse response = sessionService.updateSessionStatus(id, status, summary);
        return ResponseEntity.ok(ApiResponse.success("Session status updated successfully", response));
    }

    // ─── Mentor Feedback Endpoints ───────────────────────────────────────────

    @PostMapping("/feedback")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Record feedback for a session")
    public ResponseEntity<ApiResponse<MentorFeedbackResponse>> recordFeedback(@Valid @RequestBody MentorFeedbackRequest request) {
        MentorFeedbackResponse response = feedbackService.recordFeedback(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Feedback recorded successfully", response));
    }

    @GetMapping("/feedback")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get feedback by session ID")
    public ResponseEntity<ApiResponse<MentorFeedbackResponse>> getFeedback(@RequestParam UUID sessionId) {
        MentorFeedbackResponse response = feedbackService.getFeedbackBySession(sessionId);
        return ResponseEntity.ok(ApiResponse.success("Feedback retrieved successfully", response));
    }

    // ─── Action Plan Endpoints ────────────────────────────────────────────────

    @PostMapping("/action-plans")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Create an action plan for a session")
    public ResponseEntity<ApiResponse<ActionPlanResponse>> createActionPlan(@Valid @RequestBody ActionPlanRequest request) {
        ActionPlanResponse response = actionPlanService.createActionPlan(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Action plan created successfully", response));
    }

    @GetMapping("/action-plans")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get action plans by session or user")
    public ResponseEntity<ApiResponse<List<ActionPlanResponse>>> getActionPlans(
            @RequestParam(required = false) UUID sessionId,
            @RequestParam(required = false) UUID userId) {
        List<ActionPlanResponse> plans;
        if (sessionId != null) {
            plans = actionPlanService.getActionPlansBySession(sessionId);
        } else if (userId != null) {
            plans = actionPlanService.getActionPlansByUser(userId);
        } else {
            plans = List.of();
        }
        return ResponseEntity.ok(ApiResponse.success("Action plans retrieved successfully", plans));
    }

    @PutMapping("/action-plans/{id}/status")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Update action plan status")
    public ResponseEntity<ApiResponse<ActionPlanResponse>> updateActionPlanStatus(
            @PathVariable UUID id,
            @RequestParam ActionPlanStatus status) {
        ActionPlanResponse response = actionPlanService.updateActionPlanStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Action plan status updated successfully", response));
    }

    // ─── Mentorship Evaluation Endpoints ──────────────────────────────────────

    @PostMapping("/evaluations")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Evaluate startup session")
    public ResponseEntity<ApiResponse<MentorshipEvaluationResponse>> evaluateSession(@Valid @RequestBody MentorshipEvaluationRequest request) {
        MentorshipEvaluationResponse response = evaluationService.evaluateSession(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Evaluation recorded successfully", response));
    }

    @GetMapping("/evaluations")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get evaluation by session ID")
    public ResponseEntity<ApiResponse<MentorshipEvaluationResponse>> getEvaluation(@RequestParam UUID sessionId) {
        MentorshipEvaluationResponse response = evaluationService.getEvaluationBySession(sessionId);
        return ResponseEntity.ok(ApiResponse.success("Evaluation retrieved successfully", response));
    }
}

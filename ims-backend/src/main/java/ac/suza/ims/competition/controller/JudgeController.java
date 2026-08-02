package ac.suza.ims.competition.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.competition.dto.JudgeAssignmentRequest;
import ac.suza.ims.competition.dto.JudgeAssignmentResponse;
import ac.suza.ims.competition.dto.JudgeRequest;
import ac.suza.ims.competition.dto.JudgeResponse;
import ac.suza.ims.competition.service.JudgeAssignmentService;
import ac.suza.ims.competition.service.JudgeService;
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
@Tag(name = "Competition Judges", description = "Endpoints for registering judges and assigning them to competitions")
public class JudgeController {

    private final JudgeService judgeService;
    private final JudgeAssignmentService assignmentService;

    @PostMapping("/judges")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Register a panel judge")
    public ResponseEntity<ApiResponse<JudgeResponse>> registerJudge(@Valid @RequestBody JudgeRequest request) {
        JudgeResponse response = judgeService.registerJudge(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Judge registered successfully", response));
    }

    @GetMapping("/judges")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all registered judges")
    public ResponseEntity<ApiResponse<List<JudgeResponse>>> getAllJudges() {
        List<JudgeResponse> response = judgeService.getAllJudges();
        return ResponseEntity.ok(ApiResponse.success("Judges retrieved successfully", response));
    }

    @PostMapping("/judge-assignments")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Assign a judge to a competition")
    public ResponseEntity<ApiResponse<JudgeAssignmentResponse>> assignJudge(@Valid @RequestBody JudgeAssignmentRequest request) {
        JudgeAssignmentResponse response = assignmentService.assignJudge(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Judge assigned successfully", response));
    }

    @GetMapping("/judge-assignments")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get judge assignments by competition ID")
    public ResponseEntity<ApiResponse<List<JudgeAssignmentResponse>>> getAssignmentsByCompetition(@RequestParam UUID competitionId) {
        List<JudgeAssignmentResponse> response = assignmentService.getAssignmentsByCompetition(competitionId);
        return ResponseEntity.ok(ApiResponse.success("Judge assignments retrieved successfully", response));
    }
}

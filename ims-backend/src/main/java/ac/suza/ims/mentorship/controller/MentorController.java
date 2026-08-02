package ac.suza.ims.mentorship.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.mentorship.dto.*;
import ac.suza.ims.mentorship.service.MentorAssignmentService;
import ac.suza.ims.mentorship.service.MentorService;
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
@Tag(name = "Mentorship Management", description = "Endpoints for mentor registration, assignments, sessions, and evaluations")
public class MentorController {

    private final MentorService mentorService;
    private final MentorAssignmentService assignmentService;

    // ─── Mentor Endpoints ────────────────────────────────────────────────────

    @PostMapping("/mentors")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Register a new mentor")
    public ResponseEntity<ApiResponse<MentorResponse>> registerMentor(@Valid @RequestBody CreateMentorRequest request) {
        MentorResponse response = mentorService.registerMentor(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Mentor registered successfully", response));
    }

    @GetMapping("/mentors")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all mentors")
    public ResponseEntity<ApiResponse<List<MentorResponse>>> getAllMentors() {
        List<MentorResponse> response = mentorService.getAllMentors();
        return ResponseEntity.ok(ApiResponse.success("Mentors retrieved successfully", response));
    }

    @GetMapping("/mentors/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get mentor by ID")
    public ResponseEntity<ApiResponse<MentorResponse>> getMentorById(@PathVariable UUID id) {
        MentorResponse response = mentorService.getMentorById(id);
        return ResponseEntity.ok(ApiResponse.success("Mentor retrieved successfully", response));
    }

    @PutMapping("/mentors/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Update mentor profile")
    public ResponseEntity<ApiResponse<MentorResponse>> updateMentor(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateMentorRequest request) {
        MentorResponse response = mentorService.updateMentor(id, request);
        return ResponseEntity.ok(ApiResponse.success("Mentor updated successfully", response));
    }

    @DeleteMapping("/mentors/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Delete mentor profile")
    public ResponseEntity<ApiResponse<Void>> deleteMentor(@PathVariable UUID id) {
        mentorService.deleteMentor(id);
        return ResponseEntity.ok(ApiResponse.success("Mentor deleted successfully", null));
    }

    // ─── Mentor Assignment Endpoints ──────────────────────────────────────────

    @PostMapping("/mentor-assignments")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Assign a mentor to a startup")
    public ResponseEntity<ApiResponse<MentorAssignmentResponse>> assignMentor(@Valid @RequestBody AssignMentorRequest request) {
        MentorAssignmentResponse response = assignmentService.assignMentor(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Mentor assigned successfully", response));
    }

    @GetMapping("/mentor-assignments")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get mentor assignments by mentor or startup")
    public ResponseEntity<ApiResponse<List<MentorAssignmentResponse>>> getAssignments(
            @RequestParam(required = false) UUID mentorId,
            @RequestParam(required = false) UUID startupId) {
        List<MentorAssignmentResponse> assignments;
        if (mentorId != null) {
            assignments = assignmentService.getAssignmentsByMentor(mentorId);
        } else if (startupId != null) {
            assignments = assignmentService.getAssignmentsByStartup(startupId);
        } else {
            assignments = List.of();
        }
        return ResponseEntity.ok(ApiResponse.success("Assignments retrieved successfully", assignments));
    }

    @PutMapping("/mentor-assignments/{id}/terminate")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER')")
    @Operation(summary = "Terminate a mentor assignment")
    public ResponseEntity<ApiResponse<MentorAssignmentResponse>> terminateAssignment(@PathVariable UUID id) {
        MentorAssignmentResponse response = assignmentService.terminateAssignment(id);
        return ResponseEntity.ok(ApiResponse.success("Assignment terminated successfully", response));
    }
}

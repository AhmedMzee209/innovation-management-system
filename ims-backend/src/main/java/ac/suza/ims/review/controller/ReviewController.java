package ac.suza.ims.review.controller;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.review.dto.AssignReviewerRequest;
import ac.suza.ims.review.dto.ReviewAssignmentResponse;
import ac.suza.ims.review.dto.ReviewResponse;
import ac.suza.ims.review.dto.SubmitReviewRequest;
import ac.suza.ims.review.service.InnovationReviewService;
import ac.suza.ims.review.service.ReviewAssignmentService;
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
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Innovation Review & Assignment APIs")
public class ReviewController {

    private final ReviewAssignmentService assignmentService;
    private final InnovationReviewService reviewService;

    // ==================== ASSIGNMENTS ====================

    @Operation(summary = "Assign a reviewer to an innovation")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @PostMapping("/assign")
    public ResponseEntity<ApiResponse<ReviewAssignmentResponse>> assignReviewer(
            @Valid @RequestBody AssignReviewerRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Reviewer assigned successfully",
                        assignmentService.assignReviewer(request, currentUser.getId())));
    }

    @Operation(summary = "Get all review assignments")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @GetMapping("/assignments")
    public ResponseEntity<ApiResponse<List<ReviewAssignmentResponse>>> getAssignmentsByInnovation(
            @RequestParam UUID innovationId) {
        return ResponseEntity.ok(ApiResponse.success("Assignments fetched successfully",
                assignmentService.getAssignmentsByInnovation(innovationId)));
    }

    @Operation(summary = "Get my review assignments (for authenticated reviewer)")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ReviewAssignmentResponse>>> getMyAssignments(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.success("Your assignments fetched successfully",
                assignmentService.getMyAssignments(currentUser.getId())));
    }

    // ==================== REVIEWS ====================

    @Operation(summary = "Submit a review")
    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> submitReview(
            @Valid @RequestBody SubmitReviewRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Review submitted successfully",
                        reviewService.submitReview(request, currentUser.getId())));
    }

    @Operation(summary = "Get review by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewResponse>> getReviewById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Review fetched successfully",
                reviewService.getReviewById(id)));
    }

    @Operation(summary = "Get all reviews for an innovation")
    @GetMapping("/innovation/{innovationId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewsByInnovation(@PathVariable UUID innovationId) {
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched successfully",
                reviewService.getReviewsByInnovation(innovationId)));
    }
}

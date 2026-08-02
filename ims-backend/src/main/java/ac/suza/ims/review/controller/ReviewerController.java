package ac.suza.ims.review.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.review.dto.CreateReviewerRequest;
import ac.suza.ims.review.dto.ReviewerResponse;
import ac.suza.ims.review.service.ReviewerService;
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
@RequestMapping("/api/reviewers")
@RequiredArgsConstructor
@Tag(name = "Reviewers", description = "Reviewer Profile Management APIs")
public class ReviewerController {

    private final ReviewerService reviewerService;

    @Operation(summary = "Register a new reviewer")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<ReviewerResponse>> createReviewer(@Valid @RequestBody CreateReviewerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Reviewer created successfully", reviewerService.createReviewer(request)));
    }

    @Operation(summary = "Get all reviewers")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewerResponse>>> getAllReviewers() {
        return ResponseEntity.ok(ApiResponse.success("Reviewers fetched successfully", reviewerService.getAllReviewers()));
    }

    @Operation(summary = "Get reviewer by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewerResponse>> getReviewerById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Reviewer fetched successfully", reviewerService.getReviewerById(id)));
    }

    @Operation(summary = "Get active reviewers")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<ReviewerResponse>>> getActiveReviewers() {
        return ResponseEntity.ok(ApiResponse.success("Active reviewers fetched successfully", reviewerService.getActiveReviewers()));
    }
}

package ac.suza.ims.opportunity.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.opportunity.dto.OpportunityReviewRequest;
import ac.suza.ims.opportunity.dto.OpportunityReviewResponse;
import ac.suza.ims.opportunity.service.OpportunityReviewService;
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
@Tag(name = "Opportunity Reviews", description = "Endpoints for reviewing opportunity applications")
public class OpportunityOperationController {

    private final OpportunityReviewService reviewService;

    @PostMapping("/reviews")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('ROLE_SCHOOL_INNOVATION_MANAGER') or hasAuthority('ROLE_MENTOR')")
    @Operation(summary = "Submit review & decision for an opportunity application")
    public ResponseEntity<ApiResponse<OpportunityReviewResponse>> reviewApplication(@Valid @RequestBody OpportunityReviewRequest request) {
        OpportunityReviewResponse response = reviewService.reviewApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Review submitted successfully", response));
    }

    @GetMapping("/reviews")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get reviews by application ID")
    public ResponseEntity<ApiResponse<List<OpportunityReviewResponse>>> getReviews(@RequestParam UUID applicationId) {
        List<OpportunityReviewResponse> response = reviewService.getReviewsByApplication(applicationId);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", response));
    }
}

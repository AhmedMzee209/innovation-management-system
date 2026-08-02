package ac.suza.ims.review.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.review.dto.EvaluationCriteriaRequest;
import ac.suza.ims.review.dto.EvaluationCriteriaResponse;
import ac.suza.ims.review.service.EvaluationCriteriaService;
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
@RequestMapping("/api/evaluation-criteria")
@RequiredArgsConstructor
@Tag(name = "Evaluation Criteria", description = "Review Criteria Management APIs")
public class EvaluationCriteriaController {

    private final EvaluationCriteriaService criteriaService;

    @Operation(summary = "Get all evaluation criteria")
    @GetMapping
    public ResponseEntity<ApiResponse<List<EvaluationCriteriaResponse>>> getAllCriteria() {
        return ResponseEntity.ok(ApiResponse.success("Criteria fetched successfully", criteriaService.getAllCriteria()));
    }

    @Operation(summary = "Get criteria by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EvaluationCriteriaResponse>> getCriteriaById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Criteria fetched successfully", criteriaService.getCriteriaById(id)));
    }

    @Operation(summary = "Create new evaluation criteria")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<EvaluationCriteriaResponse>> createCriteria(
            @Valid @RequestBody EvaluationCriteriaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Criteria created successfully", criteriaService.createCriteria(request)));
    }

    @Operation(summary = "Update evaluation criteria")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EvaluationCriteriaResponse>> updateCriteria(
            @PathVariable UUID id, @Valid @RequestBody EvaluationCriteriaRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Criteria updated successfully", criteriaService.updateCriteria(id, request)));
    }

    @Operation(summary = "Delete evaluation criteria")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('REVIEW_MANAGE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCriteria(@PathVariable UUID id) {
        criteriaService.deleteCriteria(id);
        return ResponseEntity.ok(ApiResponse.noContent("Criteria deleted successfully"));
    }
}

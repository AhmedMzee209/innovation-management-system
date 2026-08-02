package ac.suza.ims.document.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.document.dto.*;
import ac.suza.ims.document.service.DocumentAuditService;
import ac.suza.ims.document.service.DocumentCommentService;
import ac.suza.ims.document.service.DocumentVersionService;
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
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Document Operations", description = "Endpoints for document comments, version history, and audit trails")
public class DocumentOperationController {

    private final DocumentCommentService commentService;
    private final DocumentVersionService versionService;
    private final DocumentAuditService auditService;

    @PostMapping("/{id}/comments")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Add comment to a document")
    public ResponseEntity<ApiResponse<DocumentCommentResponse>> addComment(
            @PathVariable UUID id,
            @Valid @RequestBody DocumentCommentRequest request) {
        DocumentCommentResponse response = commentService.addComment(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Comment added successfully", response));
    }

    @GetMapping("/{id}/comments")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get comments for a document")
    public ResponseEntity<ApiResponse<List<DocumentCommentResponse>>> getComments(@PathVariable UUID id) {
        List<DocumentCommentResponse> response = commentService.getCommentsByDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Comments retrieved successfully", response));
    }

    @GetMapping("/{id}/versions")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get version history for a document")
    public ResponseEntity<ApiResponse<List<DocumentVersionResponse>>> getVersions(@PathVariable UUID id) {
        List<DocumentVersionResponse> response = versionService.getVersionsByDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Version history retrieved successfully", response));
    }

    @GetMapping("/{id}/audit")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Get audit log for a document")
    public ResponseEntity<ApiResponse<List<DocumentAuditResponse>>> getAuditTrail(@PathVariable UUID id) {
        List<DocumentAuditResponse> response = auditService.getAuditsByDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Audit trail retrieved successfully", response));
    }
}

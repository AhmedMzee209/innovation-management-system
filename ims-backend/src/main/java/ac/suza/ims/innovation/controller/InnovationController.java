package ac.suza.ims.innovation.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.innovation.dto.CreateInnovationRequest;
import ac.suza.ims.innovation.dto.InnovationResponse;
import ac.suza.ims.innovation.dto.InnovationSummaryResponse;
import ac.suza.ims.innovation.dto.InnovationDocumentResponse;
import ac.suza.ims.innovation.dto.InnovationTeamMemberRequest;
import ac.suza.ims.innovation.dto.InnovationTeamMemberResponse;
import ac.suza.ims.innovation.dto.UpdateInnovationRequest;
import ac.suza.ims.innovation.entity.DocumentType;
import ac.suza.ims.innovation.service.InnovationDocumentService;
import ac.suza.ims.innovation.service.InnovationService;
import ac.suza.ims.innovation.service.InnovationTeamMemberService;
import ac.suza.ims.security.model.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/innovations")
@RequiredArgsConstructor
@Tag(name = "Innovations", description = "Innovation Lifecycle Management APIs")
public class InnovationController {

    private final InnovationService innovationService;
    private final InnovationTeamMemberService teamMemberService;
    private final InnovationDocumentService documentService;

    @Operation(summary = "Submit a new innovation")
    @PostMapping
    public ResponseEntity<ApiResponse<InnovationResponse>> createInnovation(
            @Valid @RequestBody CreateInnovationRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Innovation submitted successfully", 
                        innovationService.createInnovation(request, currentUser.getId())));
    }

    @Operation(summary = "Update an innovation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationResponse>> updateInnovation(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateInnovationRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.ok(ApiResponse.success("Innovation updated successfully", 
                innovationService.updateInnovation(id, request, currentUser.getId())));
    }

    @Operation(summary = "Delete an innovation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInnovation(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        innovationService.deleteInnovation(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.noContent("Innovation deleted successfully"));
    }

    @Operation(summary = "Submit an innovation for review")
    @PostMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<Void>> submitInnovation(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        innovationService.updateInnovationStatus(id, "SUBMITTED", "Submitted for review", currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Innovation submitted successfully", null));
    }

    @Operation(summary = "Get innovation by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationResponse>> getInnovationById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Innovation fetched successfully", 
                innovationService.getInnovationById(id)));
    }

    @Operation(summary = "Get all innovations (Admin)")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_INNOVATION_DIRECTOR') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER') or hasAuthority('INNOVATION_VIEW_ALL')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<InnovationSummaryResponse>>> getAllInnovations() {
        return ResponseEntity.ok(ApiResponse.success("Innovations fetched successfully", 
                innovationService.getAllInnovations()));
    }

    @Operation(summary = "Get my innovations")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<InnovationSummaryResponse>>> getMyInnovations(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.ok(ApiResponse.success("My innovations fetched successfully", 
                innovationService.getMyInnovations(currentUser.getId())));
    }

    // ==================== TEAM MEMBERS ====================

    @Operation(summary = "Add a team member to an innovation")
    @PostMapping("/{id}/team-members")
    public ResponseEntity<ApiResponse<InnovationTeamMemberResponse>> addTeamMember(
            @PathVariable UUID id,
            @Valid @RequestBody InnovationTeamMemberRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Team member added successfully", 
                        teamMemberService.addTeamMember(id, request, currentUser.getId())));
    }

    @Operation(summary = "Get team members for an innovation")
    @GetMapping("/{id}/team-members")
    public ResponseEntity<ApiResponse<List<InnovationTeamMemberResponse>>> getTeamMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Team members fetched successfully", 
                teamMemberService.getTeamMembers(id)));
    }

    @Operation(summary = "Remove a team member from an innovation")
    @DeleteMapping("/{id}/team-members/{memberId}")
    public ResponseEntity<ApiResponse<Void>> removeTeamMember(
            @PathVariable UUID id,
            @PathVariable UUID memberId,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        teamMemberService.removeTeamMember(id, memberId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.noContent("Team member removed successfully"));
    }

    // ==================== DOCUMENTS ====================

    @Operation(summary = "Upload a document for an innovation")
    @PostMapping(value = "/{id}/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<InnovationDocumentResponse>> uploadDocument(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") DocumentType documentType,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Document uploaded successfully", 
                        documentService.uploadDocument(id, file, documentType, currentUser.getId())));
    }

    @Operation(summary = "Get documents for an innovation")
    @GetMapping("/{id}/documents")
    public ResponseEntity<ApiResponse<List<InnovationDocumentResponse>>> getDocuments(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Documents fetched successfully", 
                documentService.getDocuments(id)));
    }

    @Operation(summary = "Delete a document from an innovation")
    @DeleteMapping("/{id}/documents/{documentId}")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(
            @PathVariable UUID id,
            @PathVariable UUID documentId,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        documentService.deleteDocument(id, documentId, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.noContent("Document deleted successfully"));
    }

    @Operation(summary = "Download a document")
    @GetMapping("/documents/{documentId}/download")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable UUID documentId) {
        byte[] fileData = documentService.downloadDocument(documentId);
        String contentType = documentService.getContentType(documentId);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"document\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(fileData);
    }
}

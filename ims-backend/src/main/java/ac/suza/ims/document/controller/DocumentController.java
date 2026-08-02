package ac.suza.ims.document.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.document.dto.*;
import ac.suza.ims.document.service.DocumentCategoryService;
import ac.suza.ims.document.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Endpoints for centralized document upload, metadata management, downloads, and versioning")
public class DocumentController {

    private final DocumentService documentService;
    private final DocumentCategoryService categoryService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Upload a new document with metadata")
    public ResponseEntity<ApiResponse<DocumentResponse>> uploadDocument(
            @Valid @RequestPart("metadata") UploadDocumentRequest request,
            @RequestPart("file") MultipartFile file) {
        DocumentResponse response = documentService.uploadDocument(request, file);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Document uploaded successfully", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all document summaries or filter by entity")
    public ResponseEntity<ApiResponse<List<DocumentSummaryResponse>>> getDocuments(
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) UUID entityId) {
        List<DocumentSummaryResponse> response;
        if (entityType != null && entityId != null) {
            response = documentService.getDocumentsByEntity(entityType, entityId);
        } else {
            response = documentService.getAllDocuments();
        }
        return ResponseEntity.ok(ApiResponse.success("Documents retrieved successfully", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get document metadata by ID")
    public ResponseEntity<ApiResponse<DocumentResponse>> getDocumentById(@PathVariable UUID id) {
        DocumentResponse response = documentService.getDocumentById(id);
        return ResponseEntity.ok(ApiResponse.success("Document retrieved successfully", response));
    }

    @GetMapping("/{id}/download")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Download document binary content")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable UUID id) {
        DocumentResponse metadata = documentService.getDocumentById(id);
        byte[] content = documentService.downloadDocument(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(metadata.getMimeType() != null ? metadata.getMimeType() : MediaType.APPLICATION_OCTET_STREAM_VALUE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + metadata.getOriginalFileName() + "\"")
                .body(content);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Update document metadata")
    public ResponseEntity<ApiResponse<DocumentResponse>> updateDocument(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateDocumentRequest request) {
        DocumentResponse response = documentService.updateDocument(id, request);
        return ResponseEntity.ok(ApiResponse.success("Document updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ROLE_CENTRAL_INNOVATION_MANAGER')")
    @Operation(summary = "Soft delete document")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(@PathVariable UUID id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Document soft-deleted successfully", null));
    }

    @PostMapping(value = "/{id}/versions", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Upload a replacement file to create a new document version")
    public ResponseEntity<ApiResponse<DocumentResponse>> createNewVersion(
            @PathVariable UUID id,
            @RequestPart("file") MultipartFile file) {
        DocumentResponse response = documentService.createNewVersion(id, file);
        return ResponseEntity.ok(ApiResponse.success("New version uploaded successfully", response));
    }

    @GetMapping("/categories")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all document categories")
    public ResponseEntity<ApiResponse<List<DocumentCategoryResponse>>> getCategories() {
        List<DocumentCategoryResponse> response = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success("Document categories retrieved successfully", response));
    }
}

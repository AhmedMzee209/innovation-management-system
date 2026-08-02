package ac.suza.ims.document.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.document.dto.DocumentResponse;
import ac.suza.ims.document.dto.DocumentSummaryResponse;
import ac.suza.ims.document.dto.UpdateDocumentRequest;
import ac.suza.ims.document.dto.UploadDocumentRequest;
import ac.suza.ims.document.entity.*;
import ac.suza.ims.document.mapper.DocumentMapper;
import ac.suza.ims.document.repository.*;
import ac.suza.ims.document.service.DocumentService;
import ac.suza.ims.document.storage.StorageService;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentCategoryRepository categoryRepository;
    private final DocumentVersionRepository versionRepository;
    private final DocumentAuditRepository auditRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final DocumentMapper documentMapper;

    @Override
    @Transactional
    public DocumentResponse uploadDocument(UploadDocumentRequest request, MultipartFile file) {
        log.info("Uploading document: {}", request.getTitle());

        if (file == null || file.isEmpty()) {
            throw new BusinessException("Uploaded file cannot be empty.");
        }

        DocumentCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (Exception e) {
            throw new BusinessException("Failed to read uploaded file contents.");
        }

        String checksum = calculateChecksum(bytes);
        String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String extension = getExtension(originalFileName);
        String storagePath = storageService.storeFile(bytes, originalFileName, request.getEntityType() != null ? request.getEntityType().toLowerCase() : "general");

        Document document = documentMapper.toEntity(request);
        document.setDocumentCode(generateDocumentCode());
        document.setOriginalFileName(originalFileName);
        document.setStoredFileName(storagePath.substring(storagePath.lastIndexOf('/') + 1));
        document.setStoragePath(storagePath);
        document.setMimeType(file.getContentType() != null ? file.getContentType() : "application/octet-stream");
        document.setFileExtension(extension);
        document.setFileSize(file.getSize());
        document.setChecksum(checksum);
        document.setVersionNumber(1);
        document.setCategory(category);
        document.setStatus(DocumentStatus.ACTIVE);
        if (request.getVisibility() == null) {
            document.setVisibility(DocumentVisibility.PRIVATE);
        }

        Document savedDocument = documentRepository.save(document);

        // Record Initial Version (v1)
        User currentUser = getCurrentUser();
        DocumentVersion version = DocumentVersion.builder()
                .document(savedDocument)
                .versionNumber(1)
                .storedFileName(savedDocument.getStoredFileName())
                .storagePath(storagePath)
                .checksum(checksum)
                .uploadedDate(LocalDate.now())
                .uploadedBy(currentUser)
                .build();
        versionRepository.save(version);

        // Audit Record
        logAudit(savedDocument, DocumentAction.UPLOAD, currentUser);

        return documentMapper.toResponse(savedDocument);
    }

    @Override
    @Transactional
    public byte[] downloadDocument(UUID id) {
        log.info("Downloading document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        byte[] fileBytes = storageService.loadFile(document.getStoragePath());

        logAudit(document, DocumentAction.DOWNLOAD, getCurrentUser());
        return fileBytes;
    }

    @Override
    @Transactional(readOnly = true)
    public DocumentResponse getDocumentById(UUID id) {
        log.info("Fetching document by ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
        return documentMapper.toResponse(document);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentSummaryResponse> getAllDocuments() {
        log.info("Fetching all documents");
        return documentRepository.findAll().stream()
                .map(documentMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentSummaryResponse> getDocumentsByEntity(String entityType, UUID entityId) {
        log.info("Fetching documents for entityType {} and entityId {}", entityType, entityId);
        return documentRepository.findByEntityTypeAndEntityId(entityType, entityId).stream()
                .map(documentMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DocumentResponse createNewVersion(UUID id, MultipartFile file) {
        log.info("Creating new version for document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        if (file == null || file.isEmpty()) {
            throw new BusinessException("New version file cannot be empty.");
        }

        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (Exception e) {
            throw new BusinessException("Failed to read file contents.");
        }

        String checksum = calculateChecksum(bytes);
        String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String storagePath = storageService.storeFile(bytes, originalFileName, document.getEntityType() != null ? document.getEntityType().toLowerCase() : "general");

        int nextVersion = document.getVersionNumber() + 1;
        document.setVersionNumber(nextVersion);
        document.setStoredFileName(storagePath.substring(storagePath.lastIndexOf('/') + 1));
        document.setStoragePath(storagePath);
        document.setFileSize(file.getSize());
        document.setChecksum(checksum);
        document.setMimeType(file.getContentType() != null ? file.getContentType() : document.getMimeType());

        Document savedDocument = documentRepository.save(document);

        User currentUser = getCurrentUser();
        DocumentVersion version = DocumentVersion.builder()
                .document(savedDocument)
                .versionNumber(nextVersion)
                .storedFileName(savedDocument.getStoredFileName())
                .storagePath(storagePath)
                .checksum(checksum)
                .uploadedDate(LocalDate.now())
                .uploadedBy(currentUser)
                .build();
        versionRepository.save(version);

        logAudit(savedDocument, DocumentAction.UPDATE, currentUser);

        return documentMapper.toResponse(savedDocument);
    }

    @Override
    @Transactional
    public DocumentResponse updateDocument(UUID id, UpdateDocumentRequest request) {
        log.info("Updating document metadata for ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        documentMapper.updateEntityFromRequest(request, document);

        if (request.getCategoryId() != null) {
            DocumentCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));
            document.setCategory(category);
        }

        Document saved = documentRepository.save(document);
        logAudit(saved, DocumentAction.UPDATE, getCurrentUser());
        return documentMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public DocumentResponse approveDocument(UUID id) {
        log.info("Approving document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        document.setStatus(DocumentStatus.APPROVED);
        document.setApprovedDate(LocalDate.now());
        Document saved = documentRepository.save(document);

        logAudit(saved, DocumentAction.APPROVE, getCurrentUser());
        return documentMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public DocumentResponse rejectDocument(UUID id) {
        log.info("Rejecting document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        document.setStatus(DocumentStatus.UNDER_REVIEW);
        Document saved = documentRepository.save(document);

        logAudit(saved, DocumentAction.REJECT, getCurrentUser());
        return documentMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteDocument(UUID id) {
        log.info("Soft deleting document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        document.setStatus(DocumentStatus.DELETED);
        documentRepository.save(document);
        documentRepository.delete(document);

        logAudit(document, DocumentAction.DELETE, getCurrentUser());
    }

    @Override
    @Transactional
    public DocumentResponse restoreDocument(UUID id) {
        log.info("Restoring document ID: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        document.setStatus(DocumentStatus.ACTIVE);
        Document saved = documentRepository.save(document);

        logAudit(saved, DocumentAction.RESTORE, getCurrentUser());
        return documentMapper.toResponse(saved);
    }

    private void logAudit(Document document, DocumentAction action, User performedBy) {
        DocumentAudit audit = DocumentAudit.builder()
                .document(document)
                .action(action)
                .performedBy(performedBy)
                .performedDate(LocalDate.now())
                .ipAddress("127.0.0.1")
                .device("Backend Client")
                .build();
        auditRepository.save(audit);
    }

    private String generateDocumentCode() {
        long count = documentRepository.count() + 1;
        return String.format("DOC-%d-%04d", Year.now().getValue(), count);
    }

    private String calculateChecksum(byte[] bytes) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(bytes);
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            return "UNKNOWN";
        }
    }

    private String getExtension(String fileName) {
        int dot = fileName.lastIndexOf('.');
        return dot > 0 ? fileName.substring(dot + 1) : "";
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElse(null);
    }
}

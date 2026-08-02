package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentResponse;
import ac.suza.ims.document.dto.DocumentSummaryResponse;
import ac.suza.ims.document.dto.UpdateDocumentRequest;
import ac.suza.ims.document.dto.UploadDocumentRequest;
import ac.suza.ims.document.entity.DocumentStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface DocumentService {

    DocumentResponse uploadDocument(UploadDocumentRequest request, MultipartFile file);

    byte[] downloadDocument(UUID id);

    DocumentResponse getDocumentById(UUID id);

    List<DocumentSummaryResponse> getAllDocuments();

    List<DocumentSummaryResponse> getDocumentsByEntity(String entityType, UUID entityId);

    DocumentResponse createNewVersion(UUID id, MultipartFile file);

    DocumentResponse updateDocument(UUID id, UpdateDocumentRequest request);

    DocumentResponse approveDocument(UUID id);

    DocumentResponse rejectDocument(UUID id);

    void deleteDocument(UUID id);

    DocumentResponse restoreDocument(UUID id);
}

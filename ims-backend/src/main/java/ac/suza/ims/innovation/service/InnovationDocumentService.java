package ac.suza.ims.innovation.service;

import ac.suza.ims.innovation.dto.InnovationDocumentResponse;
import ac.suza.ims.innovation.entity.DocumentType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface InnovationDocumentService {
    InnovationDocumentResponse uploadDocument(UUID innovationId, MultipartFile file, DocumentType documentType, UUID currentUserId);
    List<InnovationDocumentResponse> getDocuments(UUID innovationId);
    void deleteDocument(UUID innovationId, UUID documentId, UUID currentUserId);
    byte[] downloadDocument(UUID documentId);
    String getContentType(UUID documentId);
}

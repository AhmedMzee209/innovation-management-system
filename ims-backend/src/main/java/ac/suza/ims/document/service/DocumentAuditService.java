package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentAuditResponse;

import java.util.List;
import java.util.UUID;

public interface DocumentAuditService {

    List<DocumentAuditResponse> getAuditsByDocument(UUID documentId);
}

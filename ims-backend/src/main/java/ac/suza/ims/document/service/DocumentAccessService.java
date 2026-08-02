package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentAccessResponse;
import ac.suza.ims.document.entity.AccessType;

import java.util.List;
import java.util.UUID;

public interface DocumentAccessService {

    DocumentAccessResponse grantAccess(UUID documentId, UUID userId, AccessType accessType);

    List<DocumentAccessResponse> getAccessRecords(UUID documentId);
}

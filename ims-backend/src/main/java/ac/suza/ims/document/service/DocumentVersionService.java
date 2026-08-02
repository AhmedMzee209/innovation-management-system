package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentVersionResponse;

import java.util.List;
import java.util.UUID;

public interface DocumentVersionService {

    List<DocumentVersionResponse> getVersionsByDocument(UUID documentId);
}

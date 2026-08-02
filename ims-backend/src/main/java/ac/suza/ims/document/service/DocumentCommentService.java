package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentCommentRequest;
import ac.suza.ims.document.dto.DocumentCommentResponse;

import java.util.List;
import java.util.UUID;

public interface DocumentCommentService {

    DocumentCommentResponse addComment(UUID documentId, DocumentCommentRequest request);

    List<DocumentCommentResponse> getCommentsByDocument(UUID documentId);
}

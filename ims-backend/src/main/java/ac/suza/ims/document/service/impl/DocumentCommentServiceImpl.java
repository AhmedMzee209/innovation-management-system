package ac.suza.ims.document.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.document.dto.DocumentCommentRequest;
import ac.suza.ims.document.dto.DocumentCommentResponse;
import ac.suza.ims.document.entity.Document;
import ac.suza.ims.document.entity.DocumentComment;
import ac.suza.ims.document.mapper.DocumentCommentMapper;
import ac.suza.ims.document.repository.DocumentCommentRepository;
import ac.suza.ims.document.repository.DocumentRepository;
import ac.suza.ims.document.service.DocumentCommentService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentCommentServiceImpl implements DocumentCommentService {

    private final DocumentCommentRepository commentRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final DocumentCommentMapper commentMapper;

    @Override
    @Transactional
    public DocumentCommentResponse addComment(UUID documentId, DocumentCommentRequest request) {
        log.info("Adding comment to document ID: {}", documentId);
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + documentId));

        User currentUser = getCurrentUser();

        DocumentComment comment = DocumentComment.builder()
                .document(document)
                .user(currentUser)
                .comment(request.getComment())
                .createdDate(LocalDate.now())
                .build();

        return commentMapper.toResponse(commentRepository.save(comment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentCommentResponse> getCommentsByDocument(UUID documentId) {
        log.info("Fetching comments for document ID: {}", documentId);
        return commentRepository.findByDocumentIdOrderByCreatedDateDesc(documentId).stream()
                .map(commentMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElse(null);
    }
}

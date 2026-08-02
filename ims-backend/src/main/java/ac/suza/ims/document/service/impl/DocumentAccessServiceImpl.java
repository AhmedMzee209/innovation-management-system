package ac.suza.ims.document.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.document.dto.DocumentAccessResponse;
import ac.suza.ims.document.entity.AccessType;
import ac.suza.ims.document.entity.Document;
import ac.suza.ims.document.entity.DocumentAccess;
import ac.suza.ims.document.mapper.DocumentAccessMapper;
import ac.suza.ims.document.repository.DocumentAccessRepository;
import ac.suza.ims.document.repository.DocumentRepository;
import ac.suza.ims.document.service.DocumentAccessService;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentAccessServiceImpl implements DocumentAccessService {

    private final DocumentAccessRepository accessRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final DocumentAccessMapper accessMapper;

    @Override
    @Transactional
    public DocumentAccessResponse grantAccess(UUID documentId, UUID userId, AccessType accessType) {
        log.info("Granting {} access for document ID {} to user ID {}", accessType, documentId, userId);
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + documentId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        DocumentAccess access = DocumentAccess.builder()
                .document(document)
                .user(user)
                .accessType(accessType)
                .grantedDate(LocalDate.now())
                .build();

        return accessMapper.toResponse(accessRepository.save(access));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentAccessResponse> getAccessRecords(UUID documentId) {
        log.info("Fetching access records for document ID: {}", documentId);
        return accessRepository.findByDocumentId(documentId).stream()
                .map(accessMapper::toResponse)
                .collect(Collectors.toList());
    }
}

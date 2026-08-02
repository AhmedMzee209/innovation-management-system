package ac.suza.ims.document.service.impl;

import ac.suza.ims.document.dto.DocumentAuditResponse;
import ac.suza.ims.document.mapper.DocumentAuditMapper;
import ac.suza.ims.document.repository.DocumentAuditRepository;
import ac.suza.ims.document.service.DocumentAuditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentAuditServiceImpl implements DocumentAuditService {

    private final DocumentAuditRepository auditRepository;
    private final DocumentAuditMapper auditMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DocumentAuditResponse> getAuditsByDocument(UUID documentId) {
        log.info("Fetching audit trail for document ID: {}", documentId);
        return auditRepository.findByDocumentIdOrderByPerformedDateDesc(documentId).stream()
                .map(auditMapper::toResponse)
                .collect(Collectors.toList());
    }
}

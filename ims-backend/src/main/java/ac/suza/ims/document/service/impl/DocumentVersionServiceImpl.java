package ac.suza.ims.document.service.impl;

import ac.suza.ims.document.dto.DocumentVersionResponse;
import ac.suza.ims.document.mapper.DocumentVersionMapper;
import ac.suza.ims.document.repository.DocumentVersionRepository;
import ac.suza.ims.document.service.DocumentVersionService;
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
public class DocumentVersionServiceImpl implements DocumentVersionService {

    private final DocumentVersionRepository versionRepository;
    private final DocumentVersionMapper versionMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DocumentVersionResponse> getVersionsByDocument(UUID documentId) {
        log.info("Fetching versions for document ID: {}", documentId);
        return versionRepository.findByDocumentIdOrderByVersionNumberDesc(documentId).stream()
                .map(versionMapper::toResponse)
                .collect(Collectors.toList());
    }
}

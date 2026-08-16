package ac.suza.ims.innovation.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.dto.InnovationDocumentResponse;
import ac.suza.ims.innovation.entity.DocumentType;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationDocument;
import ac.suza.ims.innovation.mapper.InnovationDocumentMapper;
import ac.suza.ims.innovation.repository.InnovationDocumentRepository;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.innovation.service.InnovationDocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InnovationDocumentServiceImpl implements InnovationDocumentService {

    private final InnovationDocumentRepository documentRepository;
    private final InnovationRepository innovationRepository;
    private final InnovationDocumentMapper documentMapper;

    @Value("${app.upload.dir:uploads/innovations/documents}")
    private String uploadDir;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload folder!");
        }
    }

    @Override
    @Transactional
    public InnovationDocumentResponse uploadDocument(UUID innovationId, MultipartFile file, DocumentType documentType, UUID currentUserId) {
        log.info("Uploading document for innovation: {}", innovationId);
        
        Innovation innovation = innovationRepository.findById(innovationId)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        if (!innovation.getOwner().getId().equals(currentUserId)) {
            throw new BusinessException("Only the innovation owner can upload documents");
        }

        if (file.isEmpty()) {
            throw new BusinessException("File is empty");
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            
            String storedFileName = UUID.randomUUID().toString() + extension;
            Path targetLocation = Paths.get(uploadDir).resolve(storedFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            InnovationDocument document = InnovationDocument.builder()
                    .documentName(originalFilename)
                    .originalFileName(originalFilename)
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .storagePath(targetLocation.toString())
                    .documentType(documentType)
                    .innovation(innovation)
                    .build();

            return documentMapper.toResponse(documentRepository.save(document));
        } catch (IOException ex) {
            throw new BusinessException("Could not store file " + file.getOriginalFilename() + ". Please try again!");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationDocumentResponse> getDocuments(UUID innovationId) {
        return documentRepository.findByInnovationId(innovationId).stream()
                .map(documentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteDocument(UUID innovationId, UUID documentId, UUID currentUserId) {
        log.info("Deleting document {} from innovation {}", documentId, innovationId);
        
        Innovation innovation = innovationRepository.findById(innovationId)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        if (!innovation.getOwner().getId().equals(currentUserId)) {
            throw new BusinessException("Only the innovation owner can delete documents");
        }

        InnovationDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        if (!document.getInnovation().getId().equals(innovationId)) {
            throw new BusinessException("Document does not belong to this innovation");
        }

        try {
            Path file = Paths.get(document.getStoragePath());
            Files.deleteIfExists(file);
        } catch (IOException e) {
            log.error("Failed to delete file from filesystem: {}", document.getStoragePath(), e);
        }

        documentRepository.delete(document);
    }

    @Override
    public byte[] downloadDocument(UUID documentId) {
        InnovationDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        try {
            Path path = Paths.get(document.getStoragePath());
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new BusinessException("Could not read file");
        }
    }

    @Override
    public String getContentType(UUID documentId) {
        InnovationDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        return document.getFileType() != null ? document.getFileType() : "application/octet-stream";
    }
}

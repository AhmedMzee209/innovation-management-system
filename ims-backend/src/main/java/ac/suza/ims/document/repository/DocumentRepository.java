package ac.suza.ims.document.repository;

import ac.suza.ims.document.entity.Document;
import ac.suza.ims.document.entity.DocumentStatus;
import ac.suza.ims.document.entity.DocumentVisibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID>, JpaSpecificationExecutor<Document> {

    Optional<Document> findByDocumentCode(String documentCode);

    boolean existsByDocumentCode(String documentCode);

    List<Document> findByEntityTypeAndEntityId(String entityType, UUID entityId);

    List<Document> findByCategoryId(UUID categoryId);

    List<Document> findByStatus(DocumentStatus status);

    List<Document> findByVisibility(DocumentVisibility visibility);

    Optional<Document> findByChecksum(String checksum);
}

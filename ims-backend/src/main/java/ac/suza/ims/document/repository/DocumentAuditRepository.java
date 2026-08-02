package ac.suza.ims.document.repository;

import ac.suza.ims.document.entity.DocumentAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentAuditRepository extends JpaRepository<DocumentAudit, UUID> {

    List<DocumentAudit> findByDocumentIdOrderByPerformedDateDesc(UUID documentId);
}

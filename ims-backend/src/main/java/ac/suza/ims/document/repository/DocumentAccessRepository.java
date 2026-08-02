package ac.suza.ims.document.repository;

import ac.suza.ims.document.entity.DocumentAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentAccessRepository extends JpaRepository<DocumentAccess, UUID> {

    List<DocumentAccess> findByDocumentId(UUID documentId);

    List<DocumentAccess> findByUserId(UUID userId);

    boolean existsByDocumentIdAndUserId(UUID documentId, UUID userId);
}

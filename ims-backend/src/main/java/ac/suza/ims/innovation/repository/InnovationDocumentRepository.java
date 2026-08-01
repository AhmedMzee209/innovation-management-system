package ac.suza.ims.innovation.repository;

import ac.suza.ims.innovation.entity.InnovationDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InnovationDocumentRepository extends JpaRepository<InnovationDocument, UUID> {
    List<InnovationDocument> findByInnovationId(UUID innovationId);
}

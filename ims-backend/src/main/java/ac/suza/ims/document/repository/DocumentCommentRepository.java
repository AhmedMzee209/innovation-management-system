package ac.suza.ims.document.repository;

import ac.suza.ims.document.entity.DocumentComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentCommentRepository extends JpaRepository<DocumentComment, UUID> {

    List<DocumentComment> findByDocumentIdOrderByCreatedDateDesc(UUID documentId);
}

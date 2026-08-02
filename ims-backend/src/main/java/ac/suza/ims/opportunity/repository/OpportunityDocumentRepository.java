package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.OpportunityDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OpportunityDocumentRepository extends JpaRepository<OpportunityDocument, UUID> {

    List<OpportunityDocument> findByApplicationId(UUID applicationId);
}

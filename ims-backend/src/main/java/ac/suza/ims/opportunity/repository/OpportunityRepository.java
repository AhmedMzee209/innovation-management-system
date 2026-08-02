package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.Opportunity;
import ac.suza.ims.opportunity.entity.OpportunityStatus;
import ac.suza.ims.opportunity.entity.OpportunityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, UUID>, JpaSpecificationExecutor<Opportunity> {

    Optional<Opportunity> findByOpportunityCode(String opportunityCode);

    boolean existsByOpportunityCode(String opportunityCode);

    List<Opportunity> findByStatus(OpportunityStatus status);

    List<Opportunity> findByCategoryId(UUID categoryId);

    List<Opportunity> findByOpportunityType(OpportunityType opportunityType);
}

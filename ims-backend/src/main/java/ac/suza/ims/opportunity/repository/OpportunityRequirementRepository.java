package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.OpportunityRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OpportunityRequirementRepository extends JpaRepository<OpportunityRequirement, UUID> {

    List<OpportunityRequirement> findByOpportunityIdOrderByDisplayOrderAsc(UUID opportunityId);
}

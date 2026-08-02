package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.OpportunityEligibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OpportunityEligibilityRepository extends JpaRepository<OpportunityEligibility, UUID> {

    List<OpportunityEligibility> findByOpportunityId(UUID opportunityId);
}

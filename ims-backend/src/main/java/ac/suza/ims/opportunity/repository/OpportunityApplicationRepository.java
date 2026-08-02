package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.ApplicationStatus;
import ac.suza.ims.opportunity.entity.OpportunityApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OpportunityApplicationRepository extends JpaRepository<OpportunityApplication, UUID> {

    Optional<OpportunityApplication> findByApplicationNumber(String applicationNumber);

    List<OpportunityApplication> findByOpportunityId(UUID opportunityId);

    List<OpportunityApplication> findByStartupId(UUID startupId);

    List<OpportunityApplication> findByOpportunityIdAndStatus(UUID opportunityId, ApplicationStatus status);

    boolean existsByOpportunityIdAndStartupId(UUID opportunityId, UUID startupId);
}

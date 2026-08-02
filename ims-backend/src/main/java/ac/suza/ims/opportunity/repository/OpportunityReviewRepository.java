package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.OpportunityReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OpportunityReviewRepository extends JpaRepository<OpportunityReview, UUID> {

    List<OpportunityReview> findByApplicationId(UUID applicationId);
}

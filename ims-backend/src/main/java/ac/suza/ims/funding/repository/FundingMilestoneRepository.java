package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FundingMilestoneRepository extends JpaRepository<FundingMilestone, UUID> {

    List<FundingMilestone> findByApplicationId(UUID applicationId);
}

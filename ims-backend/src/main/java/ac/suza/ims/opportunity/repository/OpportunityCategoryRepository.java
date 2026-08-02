package ac.suza.ims.opportunity.repository;

import ac.suza.ims.opportunity.entity.OpportunityCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OpportunityCategoryRepository extends JpaRepository<OpportunityCategory, UUID> {

    Optional<OpportunityCategory> findByName(String name);

    boolean existsByName(String name);
}

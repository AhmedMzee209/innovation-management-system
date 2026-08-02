package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FundingApplicationRepository extends JpaRepository<FundingApplication, UUID> {

    Optional<FundingApplication> findByApplicationNumber(String applicationNumber);

    List<FundingApplication> findByStartupId(UUID startupId);

    List<FundingApplication> findByProgramId(UUID programId);

    List<FundingApplication> findByStatus(FundingApplicationStatus status);

    boolean existsByStartupIdAndProgramId(UUID startupId, UUID programId);
}

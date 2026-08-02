package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FundingReportRepository extends JpaRepository<FundingReport, UUID> {

    List<FundingReport> findByApplicationId(UUID applicationId);
}

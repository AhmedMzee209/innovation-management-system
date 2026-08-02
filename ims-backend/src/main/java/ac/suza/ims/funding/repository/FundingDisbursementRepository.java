package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingDisbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FundingDisbursementRepository extends JpaRepository<FundingDisbursement, UUID> {

    Optional<FundingDisbursement> findByDisbursementNumber(String disbursementNumber);

    List<FundingDisbursement> findByApplicationId(UUID applicationId);

    boolean existsByDisbursementNumber(String disbursementNumber);
}

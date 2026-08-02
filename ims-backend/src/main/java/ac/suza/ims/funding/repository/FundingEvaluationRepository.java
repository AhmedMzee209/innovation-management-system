package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FundingEvaluationRepository extends JpaRepository<FundingEvaluation, UUID> {

    List<FundingEvaluation> findByApplicationId(UUID applicationId);

    List<FundingEvaluation> findByCommitteeMemberId(UUID committeeMemberId);

    boolean existsByApplicationIdAndCommitteeMemberId(UUID applicationId, UUID committeeMemberId);
}

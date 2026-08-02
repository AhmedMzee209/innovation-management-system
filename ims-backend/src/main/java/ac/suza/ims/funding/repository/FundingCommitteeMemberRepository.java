package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FundingCommitteeMemberRepository extends JpaRepository<FundingCommitteeMember, UUID> {

    Optional<FundingCommitteeMember> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);
}

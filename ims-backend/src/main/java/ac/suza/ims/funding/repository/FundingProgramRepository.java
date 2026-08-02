package ac.suza.ims.funding.repository;

import ac.suza.ims.funding.entity.FundingProgram;
import ac.suza.ims.funding.entity.FundingProgramStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FundingProgramRepository extends JpaRepository<FundingProgram, UUID>, JpaSpecificationExecutor<FundingProgram> {

    Optional<FundingProgram> findByProgramCode(String programCode);

    boolean existsByProgramCode(String programCode);

    List<FundingProgram> findByStatus(FundingProgramStatus status);
}

package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StartupRepository extends JpaRepository<Startup, UUID>, JpaSpecificationExecutor<Startup> {

    Optional<Startup> findByStartupCode(String startupCode);

    Optional<Startup> findByInnovationId(UUID innovationId);

    boolean existsByStartupCode(String startupCode);

    boolean existsByInnovationId(UUID innovationId);

    List<Startup> findByStatus(StartupStatus status);

    List<Startup> findBySchoolId(UUID schoolId);

    List<Startup> findByHubId(UUID hubId);
}

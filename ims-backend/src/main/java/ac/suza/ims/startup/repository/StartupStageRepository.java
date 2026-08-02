package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.StartupStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StartupStageRepository extends JpaRepository<StartupStage, UUID> {

    Optional<StartupStage> findByName(String name);

    boolean existsByName(String name);

    List<StartupStage> findAllByOrderByOrderNumberAsc();
}

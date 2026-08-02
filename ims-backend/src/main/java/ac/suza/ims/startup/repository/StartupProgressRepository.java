package ac.suza.ims.startup.repository;

import ac.suza.ims.startup.entity.StartupProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StartupProgressRepository extends JpaRepository<StartupProgress, UUID> {

    List<StartupProgress> findByStartupIdOrderByProgressDateDesc(UUID startupId);
}

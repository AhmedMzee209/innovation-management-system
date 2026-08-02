package ac.suza.ims.dashboard.repository;

import ac.suza.ims.dashboard.entity.SavedFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SavedFilterRepository extends JpaRepository<SavedFilter, UUID> {

    List<SavedFilter> findByUserIdOrderByCreatedDateDesc(UUID userId);

    List<SavedFilter> findByUserIdAndModuleOrderByCreatedDateDesc(UUID userId, String module);
}

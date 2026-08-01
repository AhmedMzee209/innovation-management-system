package ac.suza.ims.innovation.repository;

import ac.suza.ims.innovation.entity.InnovationCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface InnovationCategoryRepository extends JpaRepository<InnovationCategory, UUID> {
    Optional<InnovationCategory> findByName(String name);
    boolean existsByName(String name);
}

package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShowcaseCategoryRepository extends JpaRepository<ShowcaseCategory, UUID> {
    Optional<ShowcaseCategory> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}

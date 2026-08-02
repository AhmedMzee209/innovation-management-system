package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.CompetitionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompetitionCategoryRepository extends JpaRepository<CompetitionCategory, UUID> {

    Optional<CompetitionCategory> findByName(String name);

    boolean existsByName(String name);
}

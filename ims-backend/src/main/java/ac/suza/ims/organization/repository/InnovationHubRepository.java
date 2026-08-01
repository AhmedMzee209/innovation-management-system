package ac.suza.ims.organization.repository;

import ac.suza.ims.organization.entity.InnovationHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InnovationHubRepository extends JpaRepository<InnovationHub, UUID> {

    List<InnovationHub> findBySchoolId(UUID schoolId);

    Optional<InnovationHub> findByCode(String code);

    boolean existsByCode(String code);

    boolean existsByName(String name);
}

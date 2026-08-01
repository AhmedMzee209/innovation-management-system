package ac.suza.ims.innovation.repository;

import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InnovationRepository extends JpaRepository<Innovation, UUID> {
    Optional<Innovation> findByInnovationCode(String innovationCode);
    boolean existsByInnovationCode(String innovationCode);
    List<Innovation> findByOwnerId(UUID ownerId);
    List<Innovation> findBySchoolId(UUID schoolId);
    List<Innovation> findByCurrentStatus(InnovationStatus currentStatus);
    long count();
}

package ac.suza.ims.innovation.repository;

import ac.suza.ims.innovation.entity.InnovationStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InnovationStatusHistoryRepository extends JpaRepository<InnovationStatusHistory, UUID> {
    List<InnovationStatusHistory> findByInnovationIdOrderByChangedDateDesc(UUID innovationId);
}

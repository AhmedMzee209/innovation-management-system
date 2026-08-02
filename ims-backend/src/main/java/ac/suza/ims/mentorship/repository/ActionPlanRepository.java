package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.ActionPlan;
import ac.suza.ims.mentorship.entity.ActionPlanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActionPlanRepository extends JpaRepository<ActionPlan, UUID> {

    List<ActionPlan> findBySessionId(UUID sessionId);

    List<ActionPlan> findBySessionIdAndStatus(UUID sessionId, ActionPlanStatus status);

    List<ActionPlan> findByAssignedToId(UUID userId);
}

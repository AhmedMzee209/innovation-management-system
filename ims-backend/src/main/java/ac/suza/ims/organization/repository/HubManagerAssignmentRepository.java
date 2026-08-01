package ac.suza.ims.organization.repository;

import ac.suza.ims.organization.entity.HubManagerAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HubManagerAssignmentRepository extends JpaRepository<HubManagerAssignment, UUID> {

    List<HubManagerAssignment> findByHubId(UUID hubId);

    List<HubManagerAssignment> findByHubIdAndActiveTrue(UUID hubId);

    List<HubManagerAssignment> findByManagerId(UUID managerId);

    boolean existsByHubIdAndManagerIdAndActiveTrue(UUID hubId, UUID managerId);
}

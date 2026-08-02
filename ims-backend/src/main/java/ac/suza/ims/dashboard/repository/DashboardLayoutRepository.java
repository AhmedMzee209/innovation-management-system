package ac.suza.ims.dashboard.repository;

import ac.suza.ims.dashboard.entity.DashboardLayout;
import ac.suza.ims.dashboard.entity.DashboardRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DashboardLayoutRepository extends JpaRepository<DashboardLayout, UUID> {

    Optional<DashboardLayout> findByUserRoleAndIsDefaultTrue(DashboardRole userRole);
}

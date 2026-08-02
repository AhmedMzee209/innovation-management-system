package ac.suza.ims.dashboard.repository;

import ac.suza.ims.dashboard.entity.DashboardWidget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DashboardWidgetRepository extends JpaRepository<DashboardWidget, UUID> {

    List<DashboardWidget> findByLayoutIdAndActiveTrueOrderByDisplayOrderAsc(UUID layoutId);

    Optional<DashboardWidget> findByWidgetCode(String widgetCode);
}

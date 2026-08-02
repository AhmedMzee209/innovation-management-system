package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShowcaseAnalyticsRepository extends JpaRepository<ShowcaseAnalytics, UUID> {
    Optional<ShowcaseAnalytics> findByAnalyticsDate(LocalDate date);
}

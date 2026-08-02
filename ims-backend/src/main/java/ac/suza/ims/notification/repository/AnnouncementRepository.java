package ac.suza.ims.notification.repository;

import ac.suza.ims.notification.entity.Announcement;
import ac.suza.ims.notification.entity.AnnouncementStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {

    List<Announcement> findByStatusOrderByPublishDateDesc(AnnouncementStatus status);
}

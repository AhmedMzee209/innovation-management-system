package ac.suza.ims.notification.service;

import ac.suza.ims.notification.dto.AnnouncementRequest;
import ac.suza.ims.notification.dto.AnnouncementResponse;

import java.util.List;
import java.util.UUID;

public interface AnnouncementService {

    AnnouncementResponse createAnnouncement(AnnouncementRequest request);

    AnnouncementResponse getAnnouncementById(UUID id);

    List<AnnouncementResponse> getActiveAnnouncements();

    List<AnnouncementResponse> getAllAnnouncements();
}

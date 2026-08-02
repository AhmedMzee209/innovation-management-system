package ac.suza.ims.notification.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.dto.AnnouncementRequest;
import ac.suza.ims.notification.dto.AnnouncementResponse;
import ac.suza.ims.notification.entity.Announcement;
import ac.suza.ims.notification.entity.AnnouncementStatus;
import ac.suza.ims.notification.entity.NotificationPriority;
import ac.suza.ims.notification.entity.TargetAudience;
import ac.suza.ims.notification.mapper.AnnouncementMapper;
import ac.suza.ims.notification.repository.AnnouncementRepository;
import ac.suza.ims.notification.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    @Transactional
    public AnnouncementResponse createAnnouncement(AnnouncementRequest request) {
        log.info("Creating announcement: {}", request.getTitle());

        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .targetAudience(request.getTargetAudience() != null ? request.getTargetAudience() : TargetAudience.ALL_USERS)
                .publishDate(request.getPublishDate() != null ? request.getPublishDate() : LocalDate.now())
                .expiryDate(request.getExpiryDate())
                .priority(request.getPriority() != null ? request.getPriority() : NotificationPriority.MEDIUM)
                .status(AnnouncementStatus.PUBLISHED)
                .build();

        return announcementMapper.toResponse(announcementRepository.save(announcement));
    }

    @Override
    @Transactional(readOnly = true)
    public AnnouncementResponse getAnnouncementById(UUID id) {
        log.info("Fetching announcement by ID: {}", id);
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        return announcementMapper.toResponse(announcement);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnnouncementResponse> getActiveAnnouncements() {
        log.info("Fetching active published announcements");
        return announcementRepository.findByStatusOrderByPublishDateDesc(AnnouncementStatus.PUBLISHED).stream()
                .filter(a -> a.getExpiryDate() == null || !LocalDate.now().isAfter(a.getExpiryDate()))
                .map(announcementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnnouncementResponse> getAllAnnouncements() {
        log.info("Fetching all announcements");
        return announcementRepository.findAll().stream()
                .map(announcementMapper::toResponse)
                .collect(Collectors.toList());
    }
}

package ac.suza.ims.notification.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.channel.NotificationChannelHandler;
import ac.suza.ims.notification.dto.CreateNotificationRequest;
import ac.suza.ims.notification.dto.NotificationResponse;
import ac.suza.ims.notification.entity.*;
import ac.suza.ims.notification.mapper.NotificationMapper;
import ac.suza.ims.notification.repository.NotificationRepository;
import ac.suza.ims.notification.repository.NotificationTemplateRepository;
import ac.suza.ims.notification.repository.UserNotificationRepository;
import ac.suza.ims.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final NotificationTemplateRepository templateRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;
    private final List<NotificationChannelHandler> channelHandlers;

    @Override
    @Transactional
    public NotificationResponse sendNotification(CreateNotificationRequest request) {
        log.info("Sending notification with title: {}", request.getTitle());

        if (request.getRecipientIds() == null || request.getRecipientIds().isEmpty()) {
            throw new BusinessException("Notifications are never sent without recipients.");
        }

        List<User> recipients = userRepository.findAllById(request.getRecipientIds());
        if (recipients.isEmpty()) {
            throw new ResourceNotFoundException("No valid recipient users found.");
        }

        NotificationTemplate template = null;
        if (request.getTemplateId() != null) {
            template = templateRepository.findById(request.getTemplateId()).orElse(null);
        }

        DeliveryChannel channel = request.getDeliveryChannel() != null ? request.getDeliveryChannel() : DeliveryChannel.IN_APP;

        Notification notification = Notification.builder()
                .notificationCode(generateNotificationCode())
                .title(request.getTitle())
                .message(request.getMessage())
                .notificationType(request.getNotificationType() != null ? request.getNotificationType() : NotificationType.GENERAL)
                .priority(request.getPriority() != null ? request.getPriority() : NotificationPriority.MEDIUM)
                .deliveryChannel(channel)
                .status("SENT")
                .sentAt(LocalDateTime.now())
                .template(template)
                .build();

        Notification savedNotification = notificationRepository.save(notification);

        // Strategy Dispatcher
        NotificationChannelHandler handler = channelHandlers.stream()
                .filter(h -> h.supports(channel))
                .findFirst()
                .orElseThrow(() -> new BusinessException("Unsupported delivery channel handler: " + channel));

        handler.sendNotification(savedNotification, recipients);

        // Return first recipient's notification response
        List<UserNotification> userNotifications = userNotificationRepository.findByUserIdOrderByCreatedAtDesc(recipients.get(0).getId());
        return notificationMapper.toResponse(userNotifications.get(0));
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getCurrentUserNotifications() {
        User currentUser = getCurrentUser();
        log.info("Fetching notifications for user: {}", currentUser.getEmail());
        return userNotificationRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId()).stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadUserNotifications() {
        User currentUser = getCurrentUser();
        log.info("Fetching unread notifications for user: {}", currentUser.getEmail());
        return userNotificationRepository.findByUserIdAndReadFalseOrderByCreatedAtDesc(currentUser.getId()).stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount() {
        User currentUser = getCurrentUser();
        return userNotificationRepository.countByUserIdAndReadFalse(currentUser.getId());
    }

    @Override
    @Transactional
    public void markAsRead(UUID userNotificationId) {
        log.info("Marking user notification ID {} as read", userNotificationId);
        UserNotification userNotification = userNotificationRepository.findById(userNotificationId)
                .orElseThrow(() -> new ResourceNotFoundException("User notification not found with id: " + userNotificationId));

        userNotification.setRead(true);
        userNotification.setReadAt(LocalDateTime.now());
        userNotificationRepository.save(userNotification);
    }

    @Override
    @Transactional
    public void markAllAsRead() {
        User currentUser = getCurrentUser();
        log.info("Marking all user notifications as read for user: {}", currentUser.getEmail());
        List<UserNotification> unreadList = userNotificationRepository.findByUserIdAndReadFalseOrderByCreatedAtDesc(currentUser.getId());
        for (UserNotification unn : unreadList) {
            unn.setRead(true);
            unn.setReadAt(LocalDateTime.now());
        }
        userNotificationRepository.saveAll(unreadList);
    }

    @Override
    @Transactional
    public void deleteUserNotification(UUID userNotificationId) {
        log.info("Deleting user notification ID: {}", userNotificationId);
        UserNotification userNotification = userNotificationRepository.findById(userNotificationId)
                .orElseThrow(() -> new ResourceNotFoundException("User notification not found with id: " + userNotificationId));
        userNotificationRepository.delete(userNotification);
    }

    private String generateNotificationCode() {
        long count = notificationRepository.count() + 1;
        return String.format("NOT-%d-%04d", Year.now().getValue(), count);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}

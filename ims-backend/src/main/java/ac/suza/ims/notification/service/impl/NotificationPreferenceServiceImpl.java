package ac.suza.ims.notification.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.dto.NotificationPreferenceRequest;
import ac.suza.ims.notification.dto.NotificationPreferenceResponse;
import ac.suza.ims.notification.entity.NotificationPreference;
import ac.suza.ims.notification.mapper.NotificationPreferenceMapper;
import ac.suza.ims.notification.repository.NotificationPreferenceRepository;
import ac.suza.ims.notification.service.NotificationPreferenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationPreferenceServiceImpl implements NotificationPreferenceService {

    private final NotificationPreferenceRepository preferenceRepository;
    private final UserRepository userRepository;
    private final NotificationPreferenceMapper preferenceMapper;

    @Override
    @Transactional
    public NotificationPreferenceResponse getCurrentUserPreferences() {
        User currentUser = getCurrentUser();
        log.info("Fetching notification preferences for user: {}", currentUser.getEmail());

        NotificationPreference preference = preferenceRepository.findByUserId(currentUser.getId())
                .orElseGet(() -> createDefaultPreference(currentUser));

        return preferenceMapper.toResponse(preference);
    }

    @Override
    @Transactional
    public NotificationPreferenceResponse updateCurrentUserPreferences(NotificationPreferenceRequest request) {
        User currentUser = getCurrentUser();
        log.info("Updating notification preferences for user: {}", currentUser.getEmail());

        NotificationPreference preference = preferenceRepository.findByUserId(currentUser.getId())
                .orElseGet(() -> createDefaultPreference(currentUser));

        if (request.getEmailEnabled() != null) preference.setEmailEnabled(request.getEmailEnabled());
        if (request.getSmsEnabled() != null) preference.setSmsEnabled(request.getSmsEnabled());
        if (request.getInAppEnabled() != null) preference.setInAppEnabled(request.getInAppEnabled());
        if (request.getPushEnabled() != null) preference.setPushEnabled(request.getPushEnabled());
        if (request.getDigestFrequency() != null) preference.setDigestFrequency(request.getDigestFrequency());

        return preferenceMapper.toResponse(preferenceRepository.save(preference));
    }

    private NotificationPreference createDefaultPreference(User user) {
        NotificationPreference preference = NotificationPreference.builder()
                .user(user)
                .emailEnabled(true)
                .smsEnabled(false)
                .inAppEnabled(true)
                .pushEnabled(true)
                .digestFrequency("DAILY")
                .build();
        return preferenceRepository.save(preference);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }
}

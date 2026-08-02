package ac.suza.ims.notification.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.notification.dto.NotificationTemplateResponse;
import ac.suza.ims.notification.entity.NotificationTemplate;
import ac.suza.ims.notification.mapper.NotificationTemplateMapper;
import ac.suza.ims.notification.repository.NotificationTemplateRepository;
import ac.suza.ims.notification.service.NotificationTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationTemplateServiceImpl implements NotificationTemplateService {

    private final NotificationTemplateRepository templateRepository;
    private final NotificationTemplateMapper templateMapper;

    @Override
    @Transactional(readOnly = true)
    public NotificationTemplateResponse getTemplateById(UUID id) {
        log.info("Fetching notification template by ID: {}", id);
        NotificationTemplate template = templateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found with id: " + id));
        return templateMapper.toResponse(template);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationTemplateResponse> getAllTemplates() {
        log.info("Fetching all notification templates");
        return templateRepository.findAll().stream()
                .map(templateMapper::toResponse)
                .collect(Collectors.toList());
    }
}

package ac.suza.ims.showcase.service.impl;

import ac.suza.ims.showcase.dto.SuccessStoryResponse;
import ac.suza.ims.showcase.mapper.SuccessStoryMapper;
import ac.suza.ims.showcase.repository.SuccessStoryRepository;
import ac.suza.ims.showcase.service.SuccessStoryService;
import ac.suza.ims.exception.ResourceNotFoundException;
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
public class SuccessStoryServiceImpl implements SuccessStoryService {

    private final SuccessStoryRepository repository;
    private final SuccessStoryMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<SuccessStoryResponse> getFeaturedSuccessStories() {
        return repository.findByFeaturedTrueOrderByPublishDateDesc().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SuccessStoryResponse> getAllSuccessStories() {
        return repository.findAllByOrderByPublishDateDesc().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessStoryResponse getSuccessStoryById(UUID id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Success story not found"));
    }
}

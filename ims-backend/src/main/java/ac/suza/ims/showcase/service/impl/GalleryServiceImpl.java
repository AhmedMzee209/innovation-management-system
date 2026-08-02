package ac.suza.ims.showcase.service.impl;

import ac.suza.ims.showcase.dto.GalleryResponse;
import ac.suza.ims.showcase.mapper.GalleryMapper;
import ac.suza.ims.showcase.repository.ShowcaseGalleryRepository;
import ac.suza.ims.showcase.service.GalleryService;
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
public class GalleryServiceImpl implements GalleryService {

    private final ShowcaseGalleryRepository repository;
    private final GalleryMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<GalleryResponse> getAllGalleries() {
        return repository.findAllByOrderByDisplayOrderAsc().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public GalleryResponse getGalleryById(UUID id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery not found"));
    }
}

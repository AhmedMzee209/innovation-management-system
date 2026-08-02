package ac.suza.ims.showcase.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.showcase.dto.CreateShowcaseRequest;
import ac.suza.ims.showcase.dto.ShowcaseResponse;
import ac.suza.ims.showcase.dto.ShowcaseSummaryResponse;
import ac.suza.ims.showcase.dto.UpdateShowcaseRequest;
import ac.suza.ims.showcase.entity.ShowcaseCategory;
import ac.suza.ims.showcase.entity.ShowcaseItem;
import ac.suza.ims.showcase.entity.ShowcaseStatus;
import ac.suza.ims.showcase.mapper.ShowcaseItemMapper;
import ac.suza.ims.showcase.repository.ShowcaseCategoryRepository;
import ac.suza.ims.showcase.repository.ShowcaseItemRepository;
import ac.suza.ims.showcase.service.ShowcaseService;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.repository.StartupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShowcaseServiceImpl implements ShowcaseService {

    private final ShowcaseItemRepository showcaseItemRepository;
    private final ShowcaseCategoryRepository categoryRepository;
    private final InnovationRepository innovationRepository;
    private final StartupRepository startupRepository;
    private final ShowcaseItemMapper showcaseMapper;

    @Override
    @Transactional
    public ShowcaseResponse createShowcaseItem(CreateShowcaseRequest request) {
        log.info("Creating showcase item for innovation/startup");

        ShowcaseCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Innovation innovation = null;
        if (request.getInnovationId() != null) {
            innovation = innovationRepository.findById(request.getInnovationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));
            if (innovation.getCurrentStatus() != ac.suza.ims.innovation.entity.InnovationStatus.APPROVED) {
                throw new IllegalStateException("Only APPROVED innovations can be published");
            }
        }

        Startup startup = null;
        if (request.getStartupId() != null) {
            startup = startupRepository.findById(request.getStartupId())
                    .orElseThrow(() -> new ResourceNotFoundException("Startup not found"));
            if (startup.getStatus() != ac.suza.ims.startup.entity.StartupStatus.ACTIVE) {
                throw new IllegalStateException("Only ACTIVE startups can be published");
            }
        }

        String slug = request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-");
        if (showcaseItemRepository.existsBySlug(slug)) {
            slug = slug + "-" + UUID.randomUUID().toString().substring(0, 8);
        }

        ShowcaseItem item = showcaseMapper.toEntity(request);
        item.setCategory(category);
        item.setInnovation(innovation);
        item.setStartup(startup);
        item.setSlug(slug);
        item.setShowcaseCode("SH-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        if (request.isPublished()) {
            item.setPublishedDate(LocalDateTime.now());
            item.setStatus(ShowcaseStatus.PUBLISHED);
        }

        return showcaseMapper.toResponse(showcaseItemRepository.save(item));
    }

    @Override
    @Transactional
    public ShowcaseResponse updateShowcaseItem(UUID id, UpdateShowcaseRequest request) {
        ShowcaseItem item = showcaseItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showcase item not found"));

        ShowcaseCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        item.setTitle(request.getTitle());
        item.setSummary(request.getSummary());
        item.setDescription(request.getDescription());
        item.setCategory(category);
        item.setFeatured(request.isFeatured());
        item.setSeoTitle(request.getSeoTitle());
        item.setSeoDescription(request.getSeoDescription());
        item.setSeoKeywords(request.getSeoKeywords());

        if (request.isPublished() && !item.isPublished()) {
            item.setPublished(true);
            item.setPublishedDate(LocalDateTime.now());
            item.setStatus(ShowcaseStatus.PUBLISHED);
        } else if (!request.isPublished()) {
            item.setPublished(false);
            item.setStatus(ShowcaseStatus.DRAFT);
        }

        return showcaseMapper.toResponse(showcaseItemRepository.save(item));
    }

    @Override
    @Transactional
    public void deleteShowcaseItem(UUID id) {
        ShowcaseItem item = showcaseItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showcase item not found"));
        showcaseItemRepository.delete(item);
    }

    @Override
    @Transactional(readOnly = true)
    public ShowcaseResponse getShowcaseItemById(UUID id) {
        return showcaseItemRepository.findById(id)
                .map(showcaseMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Showcase item not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public ShowcaseResponse getShowcaseItemBySlug(String slug) {
        return showcaseItemRepository.findBySlug(slug)
                .map(showcaseMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Showcase item not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowcaseSummaryResponse> getFeaturedInnovations() {
        return showcaseItemRepository.findByFeaturedTrueAndPublishedTrueAndStatusOrderByDisplayOrderAsc(ShowcaseStatus.PUBLISHED)
                .stream()
                .map(showcaseMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowcaseSummaryResponse> getLatestInnovations() {
        return showcaseItemRepository.findByStatusAndPublishedTrueOrderByPublishedDateDesc(ShowcaseStatus.PUBLISHED)
                .stream()
                .map(showcaseMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowcaseSummaryResponse> searchShowcaseItems(String query) {
        return showcaseItemRepository.findByStatusAndPublishedTrueOrderByPublishedDateDesc(ShowcaseStatus.PUBLISHED)
                .stream()
                .filter(item -> item.getTitle().toLowerCase().contains(query.toLowerCase()) || 
                                item.getSummary().toLowerCase().contains(query.toLowerCase()))
                .map(showcaseMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }
}

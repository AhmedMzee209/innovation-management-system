package ac.suza.ims.opportunity.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.opportunity.dto.OpportunityCategoryResponse;
import ac.suza.ims.opportunity.entity.OpportunityCategory;
import ac.suza.ims.opportunity.mapper.OpportunityCategoryMapper;
import ac.suza.ims.opportunity.repository.OpportunityCategoryRepository;
import ac.suza.ims.opportunity.service.OpportunityCategoryService;
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
public class OpportunityCategoryServiceImpl implements OpportunityCategoryService {

    private final OpportunityCategoryRepository categoryRepository;
    private final OpportunityCategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public OpportunityCategoryResponse getCategoryById(UUID id) {
        log.info("Fetching opportunity category by ID: {}", id);
        OpportunityCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunityCategoryResponse> getAllCategories() {
        log.info("Fetching all opportunity categories");
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }
}

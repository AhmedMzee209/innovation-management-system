package ac.suza.ims.innovation.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.dto.InnovationCategoryRequest;
import ac.suza.ims.innovation.dto.InnovationCategoryResponse;
import ac.suza.ims.innovation.entity.InnovationCategory;
import ac.suza.ims.innovation.mapper.InnovationCategoryMapper;
import ac.suza.ims.innovation.repository.InnovationCategoryRepository;
import ac.suza.ims.innovation.service.InnovationCategoryService;
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
public class InnovationCategoryServiceImpl implements InnovationCategoryService {

    private final InnovationCategoryRepository categoryRepository;
    private final InnovationCategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<InnovationCategoryResponse> getAllCategories() {
        log.info("Fetching all innovation categories");
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public InnovationCategoryResponse getCategoryById(UUID id) {
        log.info("Fetching innovation category by id: {}", id);
        return categoryRepository.findById(id)
                .map(categoryMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation Category not found with id: " + id));
    }

    @Override
    @Transactional
    public InnovationCategoryResponse createCategory(InnovationCategoryRequest request) {
        log.info("Creating innovation category: {}", request.getName());
        if (categoryRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Category already exists with name: " + request.getName());
        }
        InnovationCategory category = categoryMapper.toEntity(request);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public InnovationCategoryResponse updateCategory(UUID id, InnovationCategoryRequest request) {
        log.info("Updating innovation category with id: {}", id);
        InnovationCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation Category not found with id: " + id));

        if (!category.getName().equals(request.getName()) && categoryRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Category already exists with name: " + request.getName());
        }

        categoryMapper.updateEntity(request, category);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(UUID id) {
        log.info("Deleting innovation category with id: {}", id);
        InnovationCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation Category not found with id: " + id));
        categoryRepository.delete(category);
    }
}

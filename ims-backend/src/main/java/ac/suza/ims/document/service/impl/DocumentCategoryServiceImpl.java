package ac.suza.ims.document.service.impl;

import ac.suza.ims.document.dto.DocumentCategoryResponse;
import ac.suza.ims.document.entity.DocumentCategory;
import ac.suza.ims.document.mapper.DocumentCategoryMapper;
import ac.suza.ims.document.repository.DocumentCategoryRepository;
import ac.suza.ims.document.service.DocumentCategoryService;
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
public class DocumentCategoryServiceImpl implements DocumentCategoryService {

    private final DocumentCategoryRepository categoryRepository;
    private final DocumentCategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public DocumentCategoryResponse getCategoryById(UUID id) {
        log.info("Fetching document category by ID: {}", id);
        DocumentCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentCategoryResponse> getAllCategories() {
        log.info("Fetching all document categories");
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }
}

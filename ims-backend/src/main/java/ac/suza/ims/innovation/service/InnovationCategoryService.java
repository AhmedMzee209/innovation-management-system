package ac.suza.ims.innovation.service;

import ac.suza.ims.innovation.dto.InnovationCategoryRequest;
import ac.suza.ims.innovation.dto.InnovationCategoryResponse;

import java.util.List;
import java.util.UUID;

public interface InnovationCategoryService {
    List<InnovationCategoryResponse> getAllCategories();
    InnovationCategoryResponse getCategoryById(UUID id);
    InnovationCategoryResponse createCategory(InnovationCategoryRequest request);
    InnovationCategoryResponse updateCategory(UUID id, InnovationCategoryRequest request);
    void deleteCategory(UUID id);
}

package ac.suza.ims.document.service;

import ac.suza.ims.document.dto.DocumentCategoryResponse;

import java.util.List;
import java.util.UUID;

public interface DocumentCategoryService {

    DocumentCategoryResponse getCategoryById(UUID id);

    List<DocumentCategoryResponse> getAllCategories();
}

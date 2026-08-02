package ac.suza.ims.opportunity.service;

import ac.suza.ims.opportunity.dto.OpportunityCategoryResponse;

import java.util.List;
import java.util.UUID;

public interface OpportunityCategoryService {

    OpportunityCategoryResponse getCategoryById(UUID id);

    List<OpportunityCategoryResponse> getAllCategories();
}

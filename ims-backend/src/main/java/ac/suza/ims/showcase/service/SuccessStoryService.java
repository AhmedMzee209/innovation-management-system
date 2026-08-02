package ac.suza.ims.showcase.service;

import ac.suza.ims.showcase.dto.SuccessStoryResponse;
import java.util.List;
import java.util.UUID;

public interface SuccessStoryService {
    List<SuccessStoryResponse> getFeaturedSuccessStories();
    List<SuccessStoryResponse> getAllSuccessStories();
    SuccessStoryResponse getSuccessStoryById(UUID id);
}

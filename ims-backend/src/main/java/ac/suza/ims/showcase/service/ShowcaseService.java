package ac.suza.ims.showcase.service;

import ac.suza.ims.showcase.dto.CreateShowcaseRequest;
import ac.suza.ims.showcase.dto.ShowcaseResponse;
import ac.suza.ims.showcase.dto.ShowcaseSummaryResponse;
import ac.suza.ims.showcase.dto.UpdateShowcaseRequest;

import java.util.List;
import java.util.UUID;

public interface ShowcaseService {
    ShowcaseResponse createShowcaseItem(CreateShowcaseRequest request);
    ShowcaseResponse updateShowcaseItem(UUID id, UpdateShowcaseRequest request);
    void deleteShowcaseItem(UUID id);
    ShowcaseResponse getShowcaseItemById(UUID id);
    ShowcaseResponse getShowcaseItemBySlug(String slug);
    List<ShowcaseSummaryResponse> getFeaturedInnovations();
    List<ShowcaseSummaryResponse> getLatestInnovations();
    List<ShowcaseSummaryResponse> searchShowcaseItems(String query);
}

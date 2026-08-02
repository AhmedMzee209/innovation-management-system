package ac.suza.ims.dashboard.service;

import ac.suza.ims.dashboard.dto.SavedFilterRequest;
import ac.suza.ims.dashboard.dto.SavedFilterResponse;

import java.util.List;
import java.util.UUID;

public interface SavedFilterService {

    SavedFilterResponse createFilter(SavedFilterRequest request);

    List<SavedFilterResponse> getCurrentUserFilters(String module);

    void deleteFilter(UUID id);
}

package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.StartupProgressRequest;
import ac.suza.ims.startup.dto.StartupProgressResponse;

import java.util.List;
import java.util.UUID;

public interface StartupProgressService {

    StartupProgressResponse addProgressRecord(UUID startupId, StartupProgressRequest request);

    List<StartupProgressResponse> getProgressHistory(UUID startupId);
}

package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.StartupStageResponse;

import java.util.List;
import java.util.UUID;

public interface StartupStageService {

    List<StartupStageResponse> getAllStages();

    StartupStageResponse getStageById(UUID id);
}

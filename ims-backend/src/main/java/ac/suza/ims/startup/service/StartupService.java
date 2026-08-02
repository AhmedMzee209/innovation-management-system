package ac.suza.ims.startup.service;

import ac.suza.ims.startup.dto.CreateStartupRequest;
import ac.suza.ims.startup.dto.StartupResponse;
import ac.suza.ims.startup.dto.StartupSummaryResponse;
import ac.suza.ims.startup.dto.UpdateStartupRequest;
import ac.suza.ims.startup.entity.StartupStatus;

import java.util.List;
import java.util.UUID;

public interface StartupService {

    StartupResponse createStartup(CreateStartupRequest request);

    StartupResponse getStartupById(UUID id);

    StartupResponse getStartupByCode(String code);

    List<StartupSummaryResponse> getAllStartups();

    List<StartupSummaryResponse> filterStartups(UUID schoolId, UUID hubId, UUID stageId, StartupStatus status);

    StartupResponse updateStartup(UUID id, UpdateStartupRequest request);

    void deleteStartup(UUID id);
}

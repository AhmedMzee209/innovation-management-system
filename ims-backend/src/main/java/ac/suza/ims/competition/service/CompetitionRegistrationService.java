package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.CompetitionRegistrationRequest;
import ac.suza.ims.competition.dto.CompetitionRegistrationResponse;
import ac.suza.ims.competition.entity.RegistrationStatus;

import java.util.List;
import java.util.UUID;

public interface CompetitionRegistrationService {

    CompetitionRegistrationResponse registerStartup(CompetitionRegistrationRequest request);

    CompetitionRegistrationResponse getRegistrationById(UUID id);

    List<CompetitionRegistrationResponse> getRegistrationsByCompetition(UUID competitionId);

    List<CompetitionRegistrationResponse> getRegistrationsByStartup(UUID startupId);

    CompetitionRegistrationResponse updateRegistrationStatus(UUID id, RegistrationStatus status, String remarks);
}

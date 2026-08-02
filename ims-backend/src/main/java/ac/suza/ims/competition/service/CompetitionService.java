package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.CompetitionResponse;
import ac.suza.ims.competition.dto.CreateCompetitionRequest;

import java.util.List;
import java.util.UUID;

public interface CompetitionService {

    CompetitionResponse createCompetition(CreateCompetitionRequest request);

    CompetitionResponse getCompetitionById(UUID id);

    List<CompetitionResponse> getAllCompetitions();

    CompetitionResponse publishCompetition(UUID id);

    CompetitionResponse updateCompetition(UUID id, CreateCompetitionRequest request);

    void deleteCompetition(UUID id);
}

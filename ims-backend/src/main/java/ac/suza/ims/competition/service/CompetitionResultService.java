package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.CompetitionResultResponse;

import java.util.List;
import java.util.UUID;

public interface CompetitionResultService {

    List<CompetitionResultResponse> calculateAndPublishResults(UUID competitionId);

    List<CompetitionResultResponse> getResultsByCompetition(UUID competitionId);
}

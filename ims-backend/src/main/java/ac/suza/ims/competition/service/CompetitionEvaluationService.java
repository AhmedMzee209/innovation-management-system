package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.CompetitionEvaluationRequest;
import ac.suza.ims.competition.dto.CompetitionEvaluationResponse;

import java.util.List;
import java.util.UUID;

public interface CompetitionEvaluationService {

    CompetitionEvaluationResponse evaluateStartup(CompetitionEvaluationRequest request);

    List<CompetitionEvaluationResponse> getEvaluationsByRegistration(UUID registrationId);
}

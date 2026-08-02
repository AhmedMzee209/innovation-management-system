package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.PrizeRequest;
import ac.suza.ims.competition.dto.PrizeResponse;

import java.util.List;
import java.util.UUID;

public interface PrizeService {

    PrizeResponse createPrize(PrizeRequest request);

    List<PrizeResponse> getPrizesByCompetition(UUID competitionId);
}

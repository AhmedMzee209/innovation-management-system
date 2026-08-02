package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.JudgeRequest;
import ac.suza.ims.competition.dto.JudgeResponse;

import java.util.List;
import java.util.UUID;

public interface JudgeService {

    JudgeResponse registerJudge(JudgeRequest request);

    JudgeResponse getJudgeById(UUID id);

    List<JudgeResponse> getAllJudges();
}

package ac.suza.ims.competition.service;

import ac.suza.ims.competition.dto.JudgeAssignmentRequest;
import ac.suza.ims.competition.dto.JudgeAssignmentResponse;

import java.util.List;
import java.util.UUID;

public interface JudgeAssignmentService {

    JudgeAssignmentResponse assignJudge(JudgeAssignmentRequest request);

    List<JudgeAssignmentResponse> getAssignmentsByCompetition(UUID competitionId);

    List<JudgeAssignmentResponse> getAssignmentsByJudge(UUID judgeId);
}

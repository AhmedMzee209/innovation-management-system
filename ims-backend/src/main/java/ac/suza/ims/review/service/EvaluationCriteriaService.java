package ac.suza.ims.review.service;

import ac.suza.ims.review.dto.EvaluationCriteriaRequest;
import ac.suza.ims.review.dto.EvaluationCriteriaResponse;

import java.util.List;
import java.util.UUID;

public interface EvaluationCriteriaService {
    EvaluationCriteriaResponse createCriteria(EvaluationCriteriaRequest request);
    EvaluationCriteriaResponse getCriteriaById(UUID id);
    List<EvaluationCriteriaResponse> getAllCriteria();
    EvaluationCriteriaResponse updateCriteria(UUID id, EvaluationCriteriaRequest request);
    void deleteCriteria(UUID id);
}

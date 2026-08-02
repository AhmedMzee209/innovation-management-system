package ac.suza.ims.review.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.review.dto.EvaluationCriteriaRequest;
import ac.suza.ims.review.dto.EvaluationCriteriaResponse;
import ac.suza.ims.review.entity.EvaluationCriteria;
import ac.suza.ims.review.mapper.EvaluationCriteriaMapper;
import ac.suza.ims.review.repository.EvaluationCriteriaRepository;
import ac.suza.ims.review.service.EvaluationCriteriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EvaluationCriteriaServiceImpl implements EvaluationCriteriaService {

    private final EvaluationCriteriaRepository criteriaRepository;
    private final EvaluationCriteriaMapper criteriaMapper;

    @Override
    @Transactional
    public EvaluationCriteriaResponse createCriteria(EvaluationCriteriaRequest request) {
        log.info("Creating evaluation criteria: {}", request.getName());
        if (criteriaRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Criteria already exists with name: " + request.getName());
        }
        EvaluationCriteria criteria = criteriaMapper.toEntity(request);
        if (request.getWeight() == null) {
            criteria.setWeight(1.0);
        }
        return criteriaMapper.toResponse(criteriaRepository.save(criteria));
    }

    @Override
    @Transactional(readOnly = true)
    public EvaluationCriteriaResponse getCriteriaById(UUID id) {
        log.info("Fetching criteria: {}", id);
        return criteriaRepository.findById(id)
                .map(criteriaMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Criteria not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EvaluationCriteriaResponse> getAllCriteria() {
        log.info("Fetching all evaluation criteria");
        return criteriaRepository.findAll().stream()
                .map(criteriaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EvaluationCriteriaResponse updateCriteria(UUID id, EvaluationCriteriaRequest request) {
        log.info("Updating criteria: {}", id);
        EvaluationCriteria criteria = criteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Criteria not found"));
        if (!criteria.getName().equals(request.getName()) && criteriaRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Criteria already exists with name: " + request.getName());
        }
        criteriaMapper.updateEntity(request, criteria);
        return criteriaMapper.toResponse(criteriaRepository.save(criteria));
    }

    @Override
    @Transactional
    public void deleteCriteria(UUID id) {
        log.info("Deleting criteria: {}", id);
        EvaluationCriteria criteria = criteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Criteria not found"));
        criteriaRepository.delete(criteria);
    }
}

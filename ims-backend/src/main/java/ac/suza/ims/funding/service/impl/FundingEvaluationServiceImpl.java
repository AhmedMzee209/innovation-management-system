package ac.suza.ims.funding.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.funding.dto.FundingEvaluationRequest;
import ac.suza.ims.funding.dto.FundingEvaluationResponse;
import ac.suza.ims.funding.entity.FundingApplication;
import ac.suza.ims.funding.entity.FundingApplicationStatus;
import ac.suza.ims.funding.entity.FundingCommitteeMember;
import ac.suza.ims.funding.entity.FundingEvaluation;
import ac.suza.ims.funding.mapper.FundingEvaluationMapper;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.funding.repository.FundingCommitteeMemberRepository;
import ac.suza.ims.funding.repository.FundingEvaluationRepository;
import ac.suza.ims.funding.service.FundingEvaluationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FundingEvaluationServiceImpl implements FundingEvaluationService {

    private final FundingEvaluationRepository evaluationRepository;
    private final FundingApplicationRepository applicationRepository;
    private final FundingCommitteeMemberRepository committeeMemberRepository;
    private final FundingEvaluationMapper evaluationMapper;

    @Override
    @Transactional
    public FundingEvaluationResponse evaluateApplication(FundingEvaluationRequest request) {
        log.info("Evaluating application ID {} by committee member ID {}", request.getApplicationId(), request.getCommitteeMemberId());

        FundingApplication application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Funding application not found with id: " + request.getApplicationId()));

        FundingCommitteeMember committeeMember = committeeMemberRepository.findById(request.getCommitteeMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Committee member not found with id: " + request.getCommitteeMemberId()));

        if (evaluationRepository.existsByApplicationIdAndCommitteeMemberId(request.getApplicationId(), request.getCommitteeMemberId())) {
            throw new DuplicateResourceException("This committee member has already evaluated this application.");
        }

        FundingEvaluation evaluation = evaluationMapper.toEntity(request);
        evaluation.setApplication(application);
        evaluation.setCommitteeMember(committeeMember);
        evaluation.setEvaluationDate(LocalDate.now());

        // Calculate overall score average
        double total = 0.0;
        int count = 0;
        if (evaluation.getTechnicalScore() != null) { total += evaluation.getTechnicalScore(); count++; }
        if (evaluation.getBusinessScore() != null) { total += evaluation.getBusinessScore(); count++; }
        if (evaluation.getFinancialScore() != null) { total += evaluation.getFinancialScore(); count++; }
        if (evaluation.getInnovationScore() != null) { total += evaluation.getInnovationScore(); count++; }
        if (count > 0) {
            evaluation.setOverallScore(Math.round((total / count) * 100.0) / 100.0);
        }

        // Move application status to UNDER_REVIEW if SUBMITTED
        if (application.getStatus() == FundingApplicationStatus.SUBMITTED) {
            application.setStatus(FundingApplicationStatus.UNDER_REVIEW);
            applicationRepository.save(application);
        }

        return evaluationMapper.toResponse(evaluationRepository.save(evaluation));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundingEvaluationResponse> getEvaluationsByApplication(UUID applicationId) {
        log.info("Fetching evaluations for application ID: {}", applicationId);
        return evaluationRepository.findByApplicationId(applicationId).stream()
                .map(evaluationMapper::toResponse)
                .collect(Collectors.toList());
    }
}

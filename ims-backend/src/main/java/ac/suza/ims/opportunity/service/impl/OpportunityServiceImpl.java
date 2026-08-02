package ac.suza.ims.opportunity.service.impl;

import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.opportunity.dto.CreateOpportunityRequest;
import ac.suza.ims.opportunity.dto.OpportunityResponse;
import ac.suza.ims.opportunity.dto.OpportunitySummaryResponse;
import ac.suza.ims.opportunity.dto.UpdateOpportunityRequest;
import ac.suza.ims.opportunity.entity.Opportunity;
import ac.suza.ims.opportunity.entity.OpportunityCategory;
import ac.suza.ims.opportunity.entity.OpportunityStatus;
import ac.suza.ims.opportunity.entity.OpportunityType;
import ac.suza.ims.opportunity.mapper.OpportunityMapper;
import ac.suza.ims.opportunity.repository.OpportunityCategoryRepository;
import ac.suza.ims.opportunity.repository.OpportunityRepository;
import ac.suza.ims.opportunity.service.OpportunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityServiceImpl implements OpportunityService {

    private final OpportunityRepository opportunityRepository;
    private final OpportunityCategoryRepository categoryRepository;
    private final OpportunityMapper opportunityMapper;

    @Override
    @Transactional
    public OpportunityResponse createOpportunity(CreateOpportunityRequest request) {
        log.info("Creating opportunity with title: {}", request.getTitle());

        Opportunity opportunity = opportunityMapper.toEntity(request);
        opportunity.setOpportunityCode(generateOpportunityCode());
        opportunity.setStatus(OpportunityStatus.DRAFT);

        if (request.getOpportunityType() == null) {
            opportunity.setOpportunityType(OpportunityType.INTERNAL);
        }

        if (request.getCategoryId() != null) {
            OpportunityCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Opportunity category not found with id: " + request.getCategoryId()));
            opportunity.setCategory(category);
        }

        return opportunityMapper.toResponse(opportunityRepository.save(opportunity));
    }

    @Override
    @Transactional(readOnly = true)
    public OpportunityResponse getOpportunityById(UUID id) {
        log.info("Fetching opportunity by ID: {}", id);
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        return opportunityMapper.toResponse(opportunity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunitySummaryResponse> getAllOpportunities() {
        log.info("Fetching all opportunities");
        return opportunityRepository.findAll().stream()
                .map(opportunityMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpportunitySummaryResponse> getOpportunitiesByCategory(UUID categoryId) {
        log.info("Fetching opportunities by category ID: {}", categoryId);
        return opportunityRepository.findByCategoryId(categoryId).stream()
                .map(opportunityMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OpportunityResponse publishOpportunity(UUID id) {
        log.info("Publishing opportunity with ID: {}", id);
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));

        opportunity.setStatus(OpportunityStatus.OPEN);
        return opportunityMapper.toResponse(opportunityRepository.save(opportunity));
    }

    @Override
    @Transactional
    public OpportunityResponse updateOpportunity(UUID id, UpdateOpportunityRequest request) {
        log.info("Updating opportunity with ID: {}", id);
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));

        opportunityMapper.updateEntityFromRequest(request, opportunity);

        if (request.getCategoryId() != null) {
            OpportunityCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Opportunity category not found with id: " + request.getCategoryId()));
            opportunity.setCategory(category);
        }

        return opportunityMapper.toResponse(opportunityRepository.save(opportunity));
    }

    @Override
    @Transactional
    public void deleteOpportunity(UUID id) {
        log.info("Deleting opportunity with ID: {}", id);
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        opportunityRepository.delete(opportunity);
    }

    private String generateOpportunityCode() {
        long count = opportunityRepository.count() + 1;
        return String.format("OPP-%d-%04d", Year.now().getValue(), count);
    }
}

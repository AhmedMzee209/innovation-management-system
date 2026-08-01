package ac.suza.ims.innovation.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.dto.CreateInnovationRequest;
import ac.suza.ims.innovation.dto.InnovationResponse;
import ac.suza.ims.innovation.dto.InnovationSummaryResponse;
import ac.suza.ims.innovation.dto.UpdateInnovationRequest;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationCategory;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.entity.InnovationStatusHistory;
import ac.suza.ims.innovation.mapper.InnovationMapper;
import ac.suza.ims.innovation.repository.InnovationCategoryRepository;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.innovation.repository.InnovationStatusHistoryRepository;
import ac.suza.ims.innovation.service.InnovationService;
import ac.suza.ims.organization.entity.Department;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.repository.DepartmentRepository;
import ac.suza.ims.organization.repository.InnovationHubRepository;
import ac.suza.ims.organization.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InnovationServiceImpl implements InnovationService {

    private final InnovationRepository innovationRepository;
    private final InnovationCategoryRepository categoryRepository;
    private final SchoolRepository schoolRepository;
    private final DepartmentRepository departmentRepository;
    private final InnovationHubRepository hubRepository;
    private final UserRepository userRepository;
    private final InnovationStatusHistoryRepository statusHistoryRepository;
    private final InnovationMapper innovationMapper;

    @Override
    @Transactional
    public InnovationResponse createInnovation(CreateInnovationRequest request, UUID ownerId) {
        log.info("Creating innovation: {}", request.getTitle());

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        InnovationCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        InnovationHub hub = hubRepository.findById(request.getHubId())
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found"));

        Innovation innovation = innovationMapper.toEntity(request);
        
        // Generate innovation code automatically (e.g., INN-2026-0001)
        String generatedCode = "INN-" + LocalDateTime.now().getYear() + "-" + 
                String.format("%04d", innovationRepository.count() + 1);
        innovation.setInnovationCode(generatedCode);
        
        innovation.setOwner(owner);
        innovation.setCategory(category);
        innovation.setSchool(school);
        innovation.setDepartment(department);
        innovation.setHub(hub);
        innovation.setCurrentStatus(InnovationStatus.DRAFT);

        Innovation saved = innovationRepository.save(innovation);
        
        // Record status history
        recordStatusHistory(saved, null, InnovationStatus.DRAFT, "Initial Draft Creation", owner);

        return innovationMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public InnovationResponse updateInnovation(UUID id, UpdateInnovationRequest request, UUID userId) {
        log.info("Updating innovation: {}", id);
        Innovation innovation = innovationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        // Only owner can update, and only in DRAFT or REVISION_REQUIRED
        if (!innovation.getOwner().getId().equals(userId)) {
            throw new BusinessException("You are not authorized to update this innovation");
        }
        
        if (innovation.getCurrentStatus() != InnovationStatus.DRAFT && 
            innovation.getCurrentStatus() != InnovationStatus.REVISION_REQUIRED) {
            throw new BusinessException("Innovation cannot be updated in its current status");
        }

        InnovationCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        innovationMapper.updateEntity(request, innovation);
        innovation.setCategory(category);

        return innovationMapper.toResponse(innovationRepository.save(innovation));
    }

    @Override
    @Transactional
    public void deleteInnovation(UUID id, UUID userId) {
        log.info("Deleting innovation: {}", id);
        Innovation innovation = innovationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));

        // Simplistic check, usually admins can also delete
        if (!innovation.getOwner().getId().equals(userId)) {
            throw new BusinessException("You are not authorized to delete this innovation");
        }

        innovationRepository.delete(innovation);
    }

    @Override
    @Transactional(readOnly = true)
    public InnovationResponse getInnovationById(UUID id) {
        log.info("Fetching innovation: {}", id);
        return innovationRepository.findById(id)
                .map(innovationMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationSummaryResponse> getAllInnovations() {
        log.info("Fetching all innovations");
        return innovationRepository.findAll().stream()
                .map(innovationMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationSummaryResponse> getMyInnovations(UUID ownerId) {
        log.info("Fetching innovations for user: {}", ownerId);
        return innovationRepository.findByOwnerId(ownerId).stream()
                .map(innovationMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationSummaryResponse> getInnovationsBySchool(UUID schoolId) {
        log.info("Fetching innovations for school: {}", schoolId);
        return innovationRepository.findBySchoolId(schoolId).stream()
                .map(innovationMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateInnovationStatus(UUID id, String newStatus, String remarks, UUID userId) {
        log.info("Updating status for innovation: {} to {}", id, newStatus);
        Innovation innovation = innovationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        InnovationStatus previousStatus = innovation.getCurrentStatus();
        InnovationStatus nextStatus = InnovationStatus.valueOf(newStatus);
        
        // Normally complex state machine validations go here
        
        innovation.setCurrentStatus(nextStatus);
        
        if (nextStatus == InnovationStatus.SUBMITTED) {
            innovation.setSubmissionDate(LocalDateTime.now());
        } else if (nextStatus == InnovationStatus.APPROVED) {
            innovation.setApprovalDate(LocalDateTime.now());
        }
        
        innovationRepository.save(innovation);
        recordStatusHistory(innovation, previousStatus, nextStatus, remarks, user);
    }
    
    private void recordStatusHistory(Innovation innovation, InnovationStatus prev, InnovationStatus curr, String remarks, User user) {
        InnovationStatusHistory history = InnovationStatusHistory.builder()
                .innovation(innovation)
                .previousStatus(prev)
                .currentStatus(curr)
                .remarks(remarks)
                .changedBy(user)
                .build();
        statusHistoryRepository.save(history);
    }
}

package ac.suza.ims.organization.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.organization.dto.HubManagerAssignmentRequest;
import ac.suza.ims.organization.dto.HubManagerAssignmentResponse;
import ac.suza.ims.organization.entity.HubManagerAssignment;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.mapper.HubManagerAssignmentMapper;
import ac.suza.ims.organization.repository.HubManagerAssignmentRepository;
import ac.suza.ims.organization.repository.InnovationHubRepository;
import ac.suza.ims.organization.service.HubManagerAssignmentService;
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
public class HubManagerAssignmentServiceImpl implements HubManagerAssignmentService {

    private final HubManagerAssignmentRepository assignmentRepository;
    private final InnovationHubRepository hubRepository;
    private final UserRepository userRepository;
    private final HubManagerAssignmentMapper assignmentMapper;

    @Override
    @Transactional
    public HubManagerAssignmentResponse assignManager(HubManagerAssignmentRequest request) {
        log.info("Assigning manager {} to hub {}", request.getManagerId(), request.getHubId());

        if (assignmentRepository.existsByHubIdAndManagerIdAndActiveTrue(request.getHubId(), request.getManagerId())) {
            throw new BusinessException("This user is already an active manager for the specified hub.");
        }

        InnovationHub hub = hubRepository.findById(request.getHubId())
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + request.getHubId()));

        User manager = userRepository.findById(request.getManagerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getManagerId()));

        HubManagerAssignment assignment = HubManagerAssignment.builder()
                .hub(hub)
                .manager(manager)
                .roleTitle(request.getRoleTitle())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .active(true)
                .build();

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    @Override
    @Transactional
    public HubManagerAssignmentResponse unassignManager(UUID assignmentId) {
        log.info("Unassigning manager for assignment: {}", assignmentId);

        HubManagerAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + assignmentId));

        if (!assignment.isActive()) {
            throw new BusinessException("This assignment is already inactive.");
        }

        assignment.setActive(false);
        assignment.setEndDate(LocalDate.now());
        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<HubManagerAssignmentResponse> getAssignmentsByHub(UUID hubId) {
        log.info("Fetching all assignments for hub: {}", hubId);
        return assignmentRepository.findByHubId(hubId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<HubManagerAssignmentResponse> getActiveManagersByHub(UUID hubId) {
        log.info("Fetching active managers for hub: {}", hubId);
        return assignmentRepository.findByHubIdAndActiveTrue(hubId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }
}

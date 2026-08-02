package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.ActionPlanRequest;
import ac.suza.ims.mentorship.dto.ActionPlanResponse;
import ac.suza.ims.mentorship.entity.ActionPlan;
import ac.suza.ims.mentorship.entity.ActionPlanStatus;
import ac.suza.ims.mentorship.entity.MentorshipSession;
import ac.suza.ims.mentorship.entity.PriorityLevel;
import ac.suza.ims.mentorship.mapper.ActionPlanMapper;
import ac.suza.ims.mentorship.repository.ActionPlanRepository;
import ac.suza.ims.mentorship.repository.MentorshipSessionRepository;
import ac.suza.ims.mentorship.service.ActionPlanService;
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
public class ActionPlanServiceImpl implements ActionPlanService {

    private final ActionPlanRepository actionPlanRepository;
    private final MentorshipSessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final ActionPlanMapper actionPlanMapper;

    @Override
    @Transactional
    public ActionPlanResponse createActionPlan(ActionPlanRequest request) {
        log.info("Creating action plan for session: {}", request.getSessionId());

        MentorshipSession session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + request.getSessionId()));

        ActionPlan actionPlan = actionPlanMapper.toEntity(request);
        actionPlan.setSession(session);

        if (request.getAssignedToUserId() != null) {
            User assignedTo = userRepository.findById(request.getAssignedToUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getAssignedToUserId()));
            actionPlan.setAssignedTo(assignedTo);
        }

        if (actionPlan.getStatus() == null) {
            actionPlan.setStatus(ActionPlanStatus.PENDING);
        }

        if (actionPlan.getPriority() == null) {
            actionPlan.setPriority(PriorityLevel.MEDIUM);
        }

        return actionPlanMapper.toResponse(actionPlanRepository.save(actionPlan));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActionPlanResponse> getActionPlansBySession(UUID sessionId) {
        log.info("Fetching action plans for session: {}", sessionId);
        return actionPlanRepository.findBySessionId(sessionId).stream()
                .map(actionPlanMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActionPlanResponse> getActionPlansByUser(UUID userId) {
        log.info("Fetching action plans for user: {}", userId);
        return actionPlanRepository.findByAssignedToId(userId).stream()
                .map(actionPlanMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ActionPlanResponse updateActionPlanStatus(UUID actionPlanId, ActionPlanStatus status) {
        log.info("Updating action plan {} status to {}", actionPlanId, status);
        ActionPlan actionPlan = actionPlanRepository.findById(actionPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("Action plan not found with id: " + actionPlanId));

        actionPlan.setStatus(status);
        if (status == ActionPlanStatus.COMPLETED && actionPlan.getCompletionDate() == null) {
            actionPlan.setCompletionDate(LocalDate.now());
        }

        return actionPlanMapper.toResponse(actionPlanRepository.save(actionPlan));
    }
}

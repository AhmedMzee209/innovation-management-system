package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.AssignMentorRequest;
import ac.suza.ims.mentorship.dto.MentorAssignmentResponse;
import ac.suza.ims.mentorship.entity.AssignmentStatus;
import ac.suza.ims.mentorship.entity.Mentor;
import ac.suza.ims.mentorship.entity.MentorAssignment;
import ac.suza.ims.mentorship.mapper.MentorAssignmentMapper;
import ac.suza.ims.mentorship.repository.MentorAssignmentRepository;
import ac.suza.ims.mentorship.repository.MentorRepository;
import ac.suza.ims.mentorship.service.MentorAssignmentService;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.repository.StartupRepository;
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
public class MentorAssignmentServiceImpl implements MentorAssignmentService {

    private final MentorAssignmentRepository assignmentRepository;
    private final MentorRepository mentorRepository;
    private final StartupRepository startupRepository;
    private final MentorAssignmentMapper assignmentMapper;

    @Override
    @Transactional
    public MentorAssignmentResponse assignMentor(AssignMentorRequest request) {
        log.info("Assigning mentor {} to startup {}", request.getMentorId(), request.getStartupId());

        Mentor mentor = mentorRepository.findById(request.getMentorId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id: " + request.getMentorId()));

        Startup startup = startupRepository.findById(request.getStartupId())
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + request.getStartupId()));

        // Rule: A mentor cannot be assigned twice to the same startup while an assignment is ACTIVE
        if (assignmentRepository.existsByMentorIdAndStartupIdAndStatus(request.getMentorId(), request.getStartupId(), AssignmentStatus.ACTIVE)) {
            throw new DuplicateResourceException("This mentor is already actively assigned to this startup.");
        }

        MentorAssignment assignment = MentorAssignment.builder()
                .mentor(mentor)
                .startup(startup)
                .assignmentDate(LocalDate.now())
                .startDate(request.getStartDate() != null ? request.getStartDate() : LocalDate.now())
                .endDate(request.getEndDate())
                .remarks(request.getRemarks())
                .status(AssignmentStatus.ACTIVE)
                .build();

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MentorAssignmentResponse> getAssignmentsByMentor(UUID mentorId) {
        log.info("Fetching assignments for mentor: {}", mentorId);
        return assignmentRepository.findByMentorId(mentorId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MentorAssignmentResponse> getAssignmentsByStartup(UUID startupId) {
        log.info("Fetching assignments for startup: {}", startupId);
        return assignmentRepository.findByStartupId(startupId).stream()
                .map(assignmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MentorAssignmentResponse terminateAssignment(UUID assignmentId) {
        log.info("Terminating assignment: {}", assignmentId);
        MentorAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + assignmentId));

        if (assignment.getStatus() == AssignmentStatus.TERMINATED || assignment.getStatus() == AssignmentStatus.COMPLETED) {
            throw new BusinessException("Assignment is already inactive.");
        }

        assignment.setStatus(AssignmentStatus.TERMINATED);
        assignment.setEndDate(LocalDate.now());

        return assignmentMapper.toResponse(assignmentRepository.save(assignment));
    }
}

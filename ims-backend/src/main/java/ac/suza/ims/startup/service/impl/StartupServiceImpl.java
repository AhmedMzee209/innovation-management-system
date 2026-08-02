package ac.suza.ims.startup.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.repository.InnovationHubRepository;
import ac.suza.ims.organization.repository.SchoolRepository;
import ac.suza.ims.startup.dto.CreateStartupRequest;
import ac.suza.ims.startup.dto.StartupResponse;
import ac.suza.ims.startup.dto.StartupSummaryResponse;
import ac.suza.ims.startup.dto.UpdateStartupRequest;
import ac.suza.ims.startup.entity.*;
import ac.suza.ims.startup.mapper.*;
import ac.suza.ims.startup.repository.*;
import ac.suza.ims.startup.service.StartupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StartupServiceImpl implements StartupService {

    private final StartupRepository startupRepository;
    private final StartupTeamMemberRepository teamMemberRepository;
    private final StartupStageRepository stageRepository;
    private final StartupMilestoneRepository milestoneRepository;
    private final StartupAchievementRepository achievementRepository;
    private final StartupProgressRepository progressRepository;
    private final InnovationRepository innovationRepository;
    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final InnovationHubRepository hubRepository;

    private final StartupMapper startupMapper;
    private final StartupTeamMemberMapper teamMemberMapper;
    private final StartupMilestoneMapper milestoneMapper;
    private final StartupAchievementMapper achievementMapper;
    private final StartupProgressMapper progressMapper;

    @Override
    @Transactional
    public StartupResponse createStartup(CreateStartupRequest request) {
        log.info("Creating startup for innovation: {}", request.getInnovationId());

        // Rule: Innovation must exist and be approved
        Innovation innovation = innovationRepository.findById(request.getInnovationId())
                .orElseThrow(() -> new ResourceNotFoundException("Innovation not found with id: " + request.getInnovationId()));

        if (innovation.getCurrentStatus() != InnovationStatus.APPROVED &&
            innovation.getCurrentStatus() != InnovationStatus.APPROVED_BY_SCHOOL &&
            innovation.getCurrentStatus() != InnovationStatus.FORWARDED_TO_CENTRAL) {
            throw new BusinessException("A startup can only be created from an APPROVED innovation. Current status: " + innovation.getCurrentStatus());
        }

        // Rule: One innovation can create only one startup
        if (startupRepository.existsByInnovationId(request.getInnovationId())) {
            throw new DuplicateResourceException("A startup has already been created for this innovation.");
        }

        // Validate founder user exists
        User founderUser = userRepository.findById(request.getFounderUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Founder user not found with id: " + request.getFounderUserId()));

        Startup startup = startupMapper.toEntity(request);
        startup.setInnovation(innovation);
        startup.setStartupCode(generateStartupCode());
        startup.setStatus(StartupStatus.ACTIVE);

        // Resolve optional stage, school, hub
        if (request.getStageId() != null) {
            StartupStage stage = stageRepository.findById(request.getStageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Startup stage not found"));
            startup.setCurrentStage(stage);
        } else {
            stageRepository.findAllByOrderByOrderNumberAsc().stream().findFirst().ifPresent(startup::setCurrentStage);
        }

        if (request.getSchoolId() != null) {
            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found"));
            startup.setSchool(school);
        } else if (innovation.getSchool() != null) {
            startup.setSchool(innovation.getSchool());
        }

        if (request.getHubId() != null) {
            InnovationHub hub = hubRepository.findById(request.getHubId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hub not found"));
            startup.setHub(hub);
        }

        Startup savedStartup = startupRepository.save(startup);

        // Add founder team member automatically
        StartupTeamMember founder = StartupTeamMember.builder()
                .startup(savedStartup)
                .user(founderUser)
                .role(StartupMemberRole.FOUNDER)
                .isFounder(true)
                .joinDate(LocalDate.now())
                .status("ACTIVE")
                .ownershipPercentage(100.0)
                .build();
        teamMemberRepository.save(founder);

        return enrichStartupResponse(savedStartup);
    }

    @Override
    @Transactional(readOnly = true)
    public StartupResponse getStartupById(UUID id) {
        log.info("Fetching startup by ID: {}", id);
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + id));
        return enrichStartupResponse(startup);
    }

    @Override
    @Transactional(readOnly = true)
    public StartupResponse getStartupByCode(String code) {
        log.info("Fetching startup by code: {}", code);
        Startup startup = startupRepository.findByStartupCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with code: " + code));
        return enrichStartupResponse(startup);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupSummaryResponse> getAllStartups() {
        log.info("Fetching all startups");
        return startupRepository.findAll().stream()
                .map(startupMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StartupSummaryResponse> filterStartups(UUID schoolId, UUID hubId, UUID stageId, StartupStatus status) {
        log.info("Filtering startups by school: {}, hub: {}, stage: {}, status: {}", schoolId, hubId, stageId, status);
        return startupRepository.findAll().stream()
                .filter(s -> schoolId == null || (s.getSchool() != null && s.getSchool().getId().equals(schoolId)))
                .filter(s -> hubId == null || (s.getHub() != null && s.getHub().getId().equals(hubId)))
                .filter(s -> stageId == null || (s.getCurrentStage() != null && s.getCurrentStage().getId().equals(stageId)))
                .filter(s -> status == null || s.getStatus() == status)
                .map(startupMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StartupResponse updateStartup(UUID id, UpdateStartupRequest request) {
        log.info("Updating startup with ID: {}", id);
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + id));

        startupMapper.updateEntity(request, startup);

        if (request.getStageId() != null) {
            StartupStage stage = stageRepository.findById(request.getStageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Startup stage not found"));
            startup.setCurrentStage(stage);
        }

        if (request.getHubId() != null) {
            InnovationHub hub = hubRepository.findById(request.getHubId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hub not found"));
            startup.setHub(hub);
        }

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Manager user not found"));
            startup.setManager(manager);
        }

        Startup updatedStartup = startupRepository.save(startup);
        return enrichStartupResponse(updatedStartup);
    }

    @Override
    @Transactional
    public void deleteStartup(UUID id) {
        log.info("Soft deleting startup with ID: {}", id);
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + id));
        startupRepository.delete(startup);
    }

    private String generateStartupCode() {
        long count = startupRepository.count() + 1;
        return String.format("STP-%d-%04d", Year.now().getValue(), count);
    }

    private StartupResponse enrichStartupResponse(Startup startup) {
        StartupResponse response = startupMapper.toResponse(startup);

        response.setTeamMembers(teamMemberRepository.findByStartupId(startup.getId()).stream()
                .map(teamMemberMapper::toResponse).collect(Collectors.toList()));

        response.setMilestones(milestoneRepository.findByStartupId(startup.getId()).stream()
                .map(milestoneMapper::toResponse).collect(Collectors.toList()));

        response.setAchievements(achievementRepository.findByStartupId(startup.getId()).stream()
                .map(achievementMapper::toResponse).collect(Collectors.toList()));

        response.setProgressRecords(progressRepository.findByStartupIdOrderByProgressDateDesc(startup.getId()).stream()
                .map(progressMapper::toResponse).collect(Collectors.toList()));

        return response;
    }
}

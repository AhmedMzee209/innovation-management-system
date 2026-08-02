package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.CompetitionRegistrationRequest;
import ac.suza.ims.competition.dto.CompetitionRegistrationResponse;
import ac.suza.ims.competition.entity.Competition;
import ac.suza.ims.competition.entity.CompetitionRegistration;
import ac.suza.ims.competition.entity.CompetitionStatus;
import ac.suza.ims.competition.entity.RegistrationStatus;
import ac.suza.ims.competition.mapper.CompetitionRegistrationMapper;
import ac.suza.ims.competition.repository.CompetitionRegistrationRepository;
import ac.suza.ims.competition.repository.CompetitionRepository;
import ac.suza.ims.competition.service.CompetitionRegistrationService;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.startup.entity.Startup;
import ac.suza.ims.startup.entity.StartupStatus;
import ac.suza.ims.startup.repository.StartupRepository;
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
public class CompetitionRegistrationServiceImpl implements CompetitionRegistrationService {

    private final CompetitionRegistrationRepository registrationRepository;
    private final CompetitionRepository competitionRepository;
    private final StartupRepository startupRepository;
    private final CompetitionRegistrationMapper registrationMapper;

    @Override
    @Transactional
    public CompetitionRegistrationResponse registerStartup(CompetitionRegistrationRequest request) {
        log.info("Registering startup ID {} for competition ID {}", request.getStartupId(), request.getCompetitionId());

        Competition competition = competitionRepository.findById(request.getCompetitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + request.getCompetitionId()));

        Startup startup = startupRepository.findById(request.getStartupId())
                .orElseThrow(() -> new ResourceNotFoundException("Startup not found with id: " + request.getStartupId()));

        // Business Rule: Only active startups may register
        if (startup.getStatus() == StartupStatus.INACTIVE || startup.getStatus() == StartupStatus.CLOSED) {
            throw new BusinessException("Only active startups are eligible to register for competitions.");
        }

        // Business Rule: Competition must be OPEN
        if (competition.getStatus() != CompetitionStatus.OPEN) {
            throw new BusinessException("Registrations are only allowed for OPEN competitions.");
        }

        // Business Rule: Registration closes automatically after deadline
        if (competition.getRegistrationCloseDate() != null && LocalDate.now().isAfter(competition.getRegistrationCloseDate())) {
            throw new BusinessException("Registration for this competition has closed.");
        }

        // Business Rule: Maximum participants cannot be exceeded
        if (competition.getMaximumParticipants() != null) {
            long currentCount = registrationRepository.countByCompetitionId(request.getCompetitionId());
            if (currentCount >= competition.getMaximumParticipants()) {
                throw new BusinessException("Maximum participants limit reached for this competition.");
            }
        }

        // Business Rule: One startup can register only once per competition
        if (registrationRepository.existsByCompetitionIdAndStartupId(request.getCompetitionId(), request.getStartupId())) {
            throw new DuplicateResourceException("This startup is already registered for this competition.");
        }

        CompetitionRegistration registration = registrationMapper.toEntity(request);
        registration.setCompetition(competition);
        registration.setStartup(startup);
        registration.setRegistrationNumber(generateRegistrationNumber());
        registration.setRegistrationDate(LocalDate.now());
        registration.setStatus(RegistrationStatus.REGISTERED);

        return registrationMapper.toResponse(registrationRepository.save(registration));
    }

    @Override
    @Transactional(readOnly = true)
    public CompetitionRegistrationResponse getRegistrationById(UUID id) {
        log.info("Fetching registration by ID: {}", id);
        CompetitionRegistration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + id));
        return registrationMapper.toResponse(registration);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompetitionRegistrationResponse> getRegistrationsByCompetition(UUID competitionId) {
        log.info("Fetching registrations for competition ID: {}", competitionId);
        return registrationRepository.findByCompetitionId(competitionId).stream()
                .map(registrationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompetitionRegistrationResponse> getRegistrationsByStartup(UUID startupId) {
        log.info("Fetching registrations for startup ID: {}", startupId);
        return registrationRepository.findByStartupId(startupId).stream()
                .map(registrationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CompetitionRegistrationResponse updateRegistrationStatus(UUID id, RegistrationStatus status, String remarks) {
        log.info("Updating registration status for ID {} to {}", id, status);
        CompetitionRegistration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + id));

        registration.setStatus(status);
        if (remarks != null) {
            registration.setRemarks(remarks);
        }

        return registrationMapper.toResponse(registrationRepository.save(registration));
    }

    private String generateRegistrationNumber() {
        long count = registrationRepository.count() + 1;
        return String.format("REG-%d-%04d", Year.now().getValue(), count);
    }
}

package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.CompetitionResponse;
import ac.suza.ims.competition.dto.CreateCompetitionRequest;
import ac.suza.ims.competition.entity.Competition;
import ac.suza.ims.competition.entity.CompetitionStatus;
import ac.suza.ims.competition.mapper.CompetitionMapper;
import ac.suza.ims.competition.repository.CompetitionRepository;
import ac.suza.ims.competition.service.CompetitionService;
import ac.suza.ims.exception.ResourceNotFoundException;
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
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final CompetitionMapper competitionMapper;

    @Override
    @Transactional
    public CompetitionResponse createCompetition(CreateCompetitionRequest request) {
        log.info("Creating competition with title: {}", request.getTitle());
        Competition competition = competitionMapper.toEntity(request);
        competition.setCompetitionCode(generateCompetitionCode());
        competition.setStatus(CompetitionStatus.DRAFT);

        return competitionMapper.toResponse(competitionRepository.save(competition));
    }

    @Override
    @Transactional(readOnly = true)
    public CompetitionResponse getCompetitionById(UUID id) {
        log.info("Fetching competition by ID: {}", id);
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + id));
        return competitionMapper.toResponse(competition);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompetitionResponse> getAllCompetitions() {
        log.info("Fetching all competitions");
        return competitionRepository.findAll().stream()
                .map(competitionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CompetitionResponse publishCompetition(UUID id) {
        log.info("Publishing competition with ID: {}", id);
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + id));

        competition.setStatus(CompetitionStatus.OPEN);
        return competitionMapper.toResponse(competitionRepository.save(competition));
    }

    @Override
    @Transactional
    public CompetitionResponse updateCompetition(UUID id, CreateCompetitionRequest request) {
        log.info("Updating competition with ID: {}", id);
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + id));

        competition.setTitle(request.getTitle());
        competition.setDescription(request.getDescription());
        competition.setTheme(request.getTheme());
        competition.setOrganizer(request.getOrganizer());
        competition.setVenue(request.getVenue());
        competition.setRegistrationOpenDate(request.getRegistrationOpenDate());
        competition.setRegistrationCloseDate(request.getRegistrationCloseDate());
        competition.setCompetitionDate(request.getCompetitionDate());
        competition.setAnnouncementDate(request.getAnnouncementDate());
        competition.setMaximumParticipants(request.getMaximumParticipants());

        return competitionMapper.toResponse(competitionRepository.save(competition));
    }

    @Override
    @Transactional
    public void deleteCompetition(UUID id) {
        log.info("Deleting competition with ID: {}", id);
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + id));
        competitionRepository.delete(competition);
    }

    private String generateCompetitionCode() {
        long count = competitionRepository.count() + 1;
        return String.format("CMP-%d-%04d", Year.now().getValue(), count);
    }
}

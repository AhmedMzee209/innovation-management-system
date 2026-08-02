package ac.suza.ims.competition.service.impl;

import ac.suza.ims.competition.dto.PrizeRequest;
import ac.suza.ims.competition.dto.PrizeResponse;
import ac.suza.ims.competition.entity.Competition;
import ac.suza.ims.competition.entity.Prize;
import ac.suza.ims.competition.mapper.PrizeMapper;
import ac.suza.ims.competition.repository.CompetitionRepository;
import ac.suza.ims.competition.repository.PrizeRepository;
import ac.suza.ims.competition.service.PrizeService;
import ac.suza.ims.exception.ResourceNotFoundException;
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
public class PrizeServiceImpl implements PrizeService {

    private final PrizeRepository prizeRepository;
    private final CompetitionRepository competitionRepository;
    private final PrizeMapper prizeMapper;

    @Override
    @Transactional
    public PrizeResponse createPrize(PrizeRequest request) {
        log.info("Creating prize with title: {}", request.getTitle());

        Prize prize = prizeMapper.toEntity(request);
        if (request.getCompetitionId() != null) {
            Competition competition = competitionRepository.findById(request.getCompetitionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Competition not found with id: " + request.getCompetitionId()));
            prize.setCompetition(competition);
        }

        return prizeMapper.toResponse(prizeRepository.save(prize));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PrizeResponse> getPrizesByCompetition(UUID competitionId) {
        log.info("Fetching prizes for competition ID: {}", competitionId);
        return prizeRepository.findByCompetitionId(competitionId).stream()
                .map(prizeMapper::toResponse)
                .collect(Collectors.toList());
    }
}

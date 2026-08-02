package ac.suza.ims.dashboard.service.impl;

import ac.suza.ims.dashboard.dto.AnalyticsResponse;
import ac.suza.ims.dashboard.dto.StatisticsResponse;
import ac.suza.ims.dashboard.entity.AnalyticsSnapshot;
import ac.suza.ims.dashboard.mapper.AnalyticsMapper;
import ac.suza.ims.dashboard.repository.AnalyticsSnapshotRepository;
import ac.suza.ims.dashboard.service.AnalyticsService;
import ac.suza.ims.dashboard.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsSnapshotRepository snapshotRepository;
    private final StatisticsService statisticsService;
    private final AnalyticsMapper analyticsMapper;

    @Override
    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalyticsData() {
        log.info("Fetching analytics data and historical snapshots");
        StatisticsResponse currentStats = statisticsService.getGlobalStatistics();

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        List<AnalyticsSnapshot> snapshots = snapshotRepository.findBySnapshotDateBetweenOrderBySnapshotDateAsc(startDate, endDate);

        List<AnalyticsResponse.SnapshotData> timeSeriesData = snapshots.stream()
                .map(analyticsMapper::toSnapshotData)
                .collect(Collectors.toList());

        return AnalyticsResponse.builder()
                .currentStatistics(currentStats)
                .timeSeries(timeSeriesData)
                .build();
    }

    @Override
    @Transactional
    public void captureDailySnapshot() {
        log.info("Capturing daily analytics snapshot for date: {}", LocalDate.now());
        StatisticsResponse stats = statisticsService.getGlobalStatistics();

        AnalyticsSnapshot snapshot = snapshotRepository.findBySnapshotDate(LocalDate.now())
                .orElseGet(() -> AnalyticsSnapshot.builder().snapshotDate(LocalDate.now()).build());

        snapshot.setTotalUsers(stats.getTotalUsers());
        snapshot.setTotalInnovations(stats.getTotalInnovations());
        snapshot.setApprovedInnovations(stats.getApprovedInnovations());
        snapshot.setTotalStartups(stats.getTotalStartups());
        snapshot.setActiveMentors(stats.getActiveMentors());
        snapshot.setFundedStartups(stats.getFundedStartups());
        snapshot.setActiveCompetitions(stats.getActiveCompetitions());
        snapshot.setOpenOpportunities(stats.getOpenOpportunities());

        snapshotRepository.save(snapshot);
    }
}

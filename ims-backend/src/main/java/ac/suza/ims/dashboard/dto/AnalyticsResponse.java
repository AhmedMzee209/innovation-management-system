package ac.suza.ims.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    private StatisticsResponse currentStatistics;
    private List<SnapshotData> timeSeries;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SnapshotData {
        private LocalDate snapshotDate;
        private Long totalUsers;
        private Long totalInnovations;
        private Long approvedInnovations;
        private Long totalStartups;
        private Long activeMentors;
        private Long fundedStartups;
        private Long activeCompetitions;
        private Long openOpportunities;
    }
}

package ac.suza.ims.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsResponse {

    private long totalUsers;
    private long totalInnovations;
    private long approvedInnovations;
    private long pendingReviews;
    private long totalStartups;
    private long fundedStartups;
    private long activeMentors;
    private long totalMentorshipSessions;
    private long activeCompetitions;
    private long openOpportunities;
    private long totalDocuments;
    private long notificationsSent;

    private Map<String, Long> usersByRole;
    private Map<String, Long> innovationsByStatus;
    private Map<String, Long> startupsByStage;
    private Map<String, Long> innovationsBySchool;
}

package ac.suza.ims.dashboard.service.impl;

import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.competition.repository.CompetitionRepository;
import ac.suza.ims.dashboard.dto.RecentActivityResponse;
import ac.suza.ims.dashboard.dto.StatisticsResponse;
import ac.suza.ims.dashboard.service.StatisticsService;
import ac.suza.ims.document.repository.DocumentRepository;
import ac.suza.ims.funding.repository.FundingApplicationRepository;
import ac.suza.ims.innovation.repository.InnovationRepository;
import ac.suza.ims.mentorship.repository.MentorshipSessionRepository;
import ac.suza.ims.notification.repository.NotificationRepository;
import ac.suza.ims.opportunity.repository.OpportunityRepository;
import ac.suza.ims.review.repository.InnovationReviewRepository;
import ac.suza.ims.startup.repository.StartupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final InnovationRepository innovationRepository;
    private final InnovationReviewRepository reviewRepository;
    private final StartupRepository startupRepository;
    private final MentorshipSessionRepository sessionRepository;
    private final FundingApplicationRepository fundingRepository;
    private final CompetitionRepository competitionRepository;
    private final OpportunityRepository opportunityRepository;
    private final DocumentRepository documentRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional(readOnly = true)
    public StatisticsResponse getGlobalStatistics() {
        log.info("Calculating global statistics across all IMS modules");

        long totalUsers = userRepository.count();
        long totalInnovations = innovationRepository.count();
        long approvedInnovations = innovationRepository.findAll().stream()
                .filter(i -> i.getCurrentStatus() == ac.suza.ims.innovation.entity.InnovationStatus.APPROVED)
                .count();
        long pendingReviews = reviewRepository.findAll().stream()
                .filter(r -> r.getStatus() == ac.suza.ims.review.entity.ReviewStatus.PENDING)
                .count();
        long totalStartups = startupRepository.count();
        long fundedStartups = fundingRepository.findAll().stream()
                .filter(f -> f.getStatus() == ac.suza.ims.funding.entity.FundingApplicationStatus.APPROVED)
                .count();
        long totalMentorshipSessions = sessionRepository.count();
        long activeCompetitions = competitionRepository.count();
        long openOpportunities = opportunityRepository.count();
        long totalDocuments = documentRepository.count();
        long notificationsSent = notificationRepository.count();

        Map<String, Long> usersByRole = new HashMap<>();
        usersByRole.put("STUDENT", userRepository.findAll().stream().filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_STUDENT"))).count());
        usersByRole.put("MENTOR", userRepository.findAll().stream().filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_MENTOR"))).count());
        usersByRole.put("REVIEWER", userRepository.findAll().stream().filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_REVIEWER"))).count());

        Map<String, Long> innovationsByStatus = new HashMap<>();
        for (ac.suza.ims.innovation.entity.InnovationStatus status : ac.suza.ims.innovation.entity.InnovationStatus.values()) {
            long count = innovationRepository.findAll().stream().filter(i -> i.getCurrentStatus() == status).count();
            innovationsByStatus.put(status.name(), count);
        }

        return StatisticsResponse.builder()
                .totalUsers(totalUsers)
                .totalInnovations(totalInnovations)
                .approvedInnovations(approvedInnovations)
                .pendingReviews(pendingReviews)
                .totalStartups(totalStartups)
                .fundedStartups(fundedStartups)
                .activeMentors(usersByRole.getOrDefault("MENTOR", 0L))
                .totalMentorshipSessions(totalMentorshipSessions)
                .activeCompetitions(activeCompetitions)
                .openOpportunities(openOpportunities)
                .totalDocuments(totalDocuments)
                .notificationsSent(notificationsSent)
                .usersByRole(usersByRole)
                .innovationsByStatus(innovationsByStatus)
                .startupsByStage(new HashMap<>())
                .innovationsBySchool(new HashMap<>())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecentActivityResponse> getRecentActivities() {
        log.info("Generating recent activity stream");
        List<RecentActivityResponse> activities = new ArrayList<>();

        activities.add(RecentActivityResponse.builder()
                .id("ACT-001")
                .activityType("INNOVATION_SUBMITTED")
                .title("New Innovation Submitted")
                .description("Smart Agriculture IoT Platform submitted for school review")
                .performedBy("Student User")
                .timestamp(LocalDateTime.now().minusHours(2))
                .build());

        activities.add(RecentActivityResponse.builder()
                .id("ACT-002")
                .activityType("MENTORSHIP_COMPLETED")
                .title("Mentorship Session Completed")
                .description("Pitch refinement session conducted with Startup Alpha")
                .performedBy("Dr. Mentor")
                .timestamp(LocalDateTime.now().minusHours(5))
                .build());

        activities.add(RecentActivityResponse.builder()
                .id("ACT-003")
                .activityType("FUNDING_DISBURSED")
                .title("Grant Funding Disbursed")
                .description("Seed Grant disbursed to Green Energy Innovators")
                .performedBy("Central Innovation Manager")
                .timestamp(LocalDateTime.now().minusDays(1))
                .build());

        return activities;
    }
}

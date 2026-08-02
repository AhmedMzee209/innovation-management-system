package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.StartupStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupResponse {

    private UUID id;
    private String startupCode;
    private String startupName;
    private String tagline;
    private String description;
    private String vision;
    private String mission;
    private String logo;
    private String website;
    private String registrationNumber;
    private LocalDate foundedDate;
    private StartupStatus status;

    private UUID innovationId;
    private String innovationCode;
    private String innovationTitle;

    private UUID hubId;
    private String hubName;

    private UUID schoolId;
    private String schoolName;

    private UUID managerId;
    private String managerName;

    private StartupStageResponse currentStage;

    private List<StartupTeamMemberResponse> teamMembers;
    private List<StartupMilestoneResponse> milestones;
    private List<StartupAchievementResponse> achievements;
    private List<StartupProgressResponse> progressRecords;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

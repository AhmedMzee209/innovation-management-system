package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.StartupMemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupTeamMemberResponse {

    private UUID id;
    private UUID userId;
    private String userName;
    private String userEmail;
    private StartupMemberRole role;
    private LocalDate joinDate;
    private LocalDate leaveDate;
    private Double ownershipPercentage;
    private Boolean isFounder;
    private String status;
}

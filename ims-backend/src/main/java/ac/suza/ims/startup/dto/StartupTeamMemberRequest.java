package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.StartupMemberRole;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
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
public class StartupTeamMemberRequest {

    @NotNull(message = "User ID is mandatory")
    private UUID userId;

    @NotNull(message = "Member role is mandatory")
    private StartupMemberRole role;

    @NotNull(message = "Join date is mandatory")
    private LocalDate joinDate;

    private LocalDate leaveDate;

    @DecimalMin(value = "0.0", message = "Ownership percentage cannot be less than 0%")
    @DecimalMax(value = "100.0", message = "Ownership percentage cannot exceed 100%")
    private Double ownershipPercentage;

    private Boolean isFounder;
}

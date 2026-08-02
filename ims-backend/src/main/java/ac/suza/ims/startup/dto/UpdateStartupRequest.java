package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.StartupStatus;
import jakarta.validation.constraints.Size;
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
public class UpdateStartupRequest {

    @Size(max = 255)
    private String startupName;

    @Size(max = 255)
    private String tagline;

    private String description;
    private String vision;
    private String mission;

    @Size(max = 500)
    private String logo;

    @Size(max = 255)
    private String website;

    @Size(max = 100)
    private String registrationNumber;

    private LocalDate foundedDate;
    private StartupStatus status;

    private UUID stageId;
    private UUID hubId;
    private UUID managerId;
}

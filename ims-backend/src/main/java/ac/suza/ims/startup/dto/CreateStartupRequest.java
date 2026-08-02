package ac.suza.ims.startup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class CreateStartupRequest {

    @NotNull(message = "Innovation ID is mandatory")
    private UUID innovationId;

    @NotBlank(message = "Startup name is mandatory")
    @Size(max = 255, message = "Startup name cannot exceed 255 characters")
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

    private UUID stageId;
    private UUID hubId;
    private UUID schoolId;

    @NotNull(message = "Primary founder user ID is mandatory")
    private UUID founderUserId;
}

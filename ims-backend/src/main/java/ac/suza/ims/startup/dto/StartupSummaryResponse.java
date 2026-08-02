package ac.suza.ims.startup.dto;

import ac.suza.ims.startup.entity.StartupStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupSummaryResponse {

    private UUID id;
    private String startupCode;
    private String startupName;
    private String tagline;
    private String logo;
    private StartupStatus status;
    private String stageName;
    private UUID innovationId;
    private String innovationCode;
    private String innovationTitle;
    private String schoolName;
    private String hubName;
}

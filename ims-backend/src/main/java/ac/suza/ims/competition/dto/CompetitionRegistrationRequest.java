package ac.suza.ims.competition.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionRegistrationRequest {

    @NotNull(message = "Competition ID is mandatory")
    private UUID competitionId;

    @NotNull(message = "Startup ID is mandatory")
    private UUID startupId;

    private String remarks;
}

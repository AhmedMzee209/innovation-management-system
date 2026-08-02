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
public class JudgeAssignmentRequest {

    @NotNull(message = "Competition ID is mandatory")
    private UUID competitionId;

    @NotNull(message = "Judge ID is mandatory")
    private UUID judgeId;
}

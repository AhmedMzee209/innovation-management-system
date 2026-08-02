package ac.suza.ims.mentorship.dto;

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
public class AssignMentorRequest {

    @NotNull(message = "Mentor ID is mandatory")
    private UUID mentorId;

    @NotNull(message = "Startup ID is mandatory")
    private UUID startupId;

    private LocalDate startDate;
    private LocalDate endDate;
    private String remarks;
}

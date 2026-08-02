package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.SessionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSessionRequest {

    @NotNull(message = "Assignment ID is mandatory")
    private UUID assignmentId;

    @NotBlank(message = "Session title is mandatory")
    @Size(max = 255)
    private String sessionTitle;

    @NotNull(message = "Session type is mandatory")
    private SessionType sessionType;

    @NotNull(message = "Session date is mandatory")
    private LocalDate sessionDate;

    private LocalTime startTime;
    private LocalTime endTime;

    @Size(max = 500)
    private String meetingLink;

    @Size(max = 255)
    private String location;

    private String agenda;
}

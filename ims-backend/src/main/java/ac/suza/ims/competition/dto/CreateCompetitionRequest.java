package ac.suza.ims.competition.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCompetitionRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @Size(max = 255)
    private String theme;

    @Size(max = 255)
    private String organizer;

    @Size(max = 255)
    private String venue;

    private LocalDate registrationOpenDate;

    @NotNull(message = "Registration close date is mandatory")
    private LocalDate registrationCloseDate;

    @NotNull(message = "Competition date is mandatory")
    private LocalDate competitionDate;

    private LocalDate announcementDate;
    private Integer maximumParticipants;
}

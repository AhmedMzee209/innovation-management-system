package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.CompetitionStatus;
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
public class CompetitionResponse {

    private UUID id;
    private String competitionCode;
    private String title;
    private String description;
    private String theme;
    private String organizer;
    private String venue;
    private LocalDate registrationOpenDate;
    private LocalDate registrationCloseDate;
    private LocalDate competitionDate;
    private LocalDate announcementDate;
    private Integer maximumParticipants;
    private CompetitionStatus status;
}

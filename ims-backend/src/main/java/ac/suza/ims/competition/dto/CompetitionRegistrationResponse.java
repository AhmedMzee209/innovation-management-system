package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.RegistrationStatus;
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
public class CompetitionRegistrationResponse {

    private UUID id;
    private String registrationNumber;
    private UUID competitionId;
    private String competitionTitle;
    private UUID startupId;
    private String startupName;
    private LocalDate registrationDate;
    private RegistrationStatus status;
    private String remarks;
}

package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.ResultDecision;
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
public class CompetitionResultResponse {

    private UUID id;
    private UUID competitionId;
    private String competitionTitle;
    private UUID startupId;
    private String startupName;
    private Integer rank;
    private Double totalScore;
    private ResultDecision decision;
    private String remarks;
    private LocalDate announcementDate;
}

package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.ApplicationStatus;
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
public class OpportunityApplicationResponse {

    private UUID id;
    private String applicationNumber;
    private UUID opportunityId;
    private String opportunityTitle;
    private UUID startupId;
    private String startupName;
    private LocalDate applicationDate;
    private ApplicationStatus status;
    private String remarks;
    private LocalDate decisionDate;
}

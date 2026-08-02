package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.OpportunityStatus;
import ac.suza.ims.opportunity.entity.OpportunityType;
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
public class OpportunitySummaryResponse {

    private UUID id;
    private String opportunityCode;
    private String title;
    private String provider;
    private String categoryName;
    private LocalDate applicationCloseDate;
    private OpportunityType opportunityType;
    private OpportunityStatus status;
}

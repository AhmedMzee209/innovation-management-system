package ac.suza.ims.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpportunityEligibilityResponse {

    private UUID id;
    private UUID opportunityId;
    private String criterion;
    private String description;
}

package ac.suza.ims.opportunity.dto;

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
public class OpportunityApplicationRequest {

    @NotNull(message = "Opportunity ID is mandatory")
    private UUID opportunityId;

    @NotNull(message = "Startup ID is mandatory")
    private UUID startupId;

    private String remarks;
}

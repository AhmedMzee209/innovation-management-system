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
public class OpportunityRequirementResponse {

    private UUID id;
    private UUID opportunityId;
    private String title;
    private String description;
    private Boolean mandatory;
    private Integer displayOrder;
}

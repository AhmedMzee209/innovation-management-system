package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.ReviewDecision;
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
public class OpportunityReviewRequest {

    @NotNull(message = "Application ID is mandatory")
    private UUID applicationId;

    @NotNull(message = "Decision is mandatory")
    private ReviewDecision decision;

    private String remarks;
}

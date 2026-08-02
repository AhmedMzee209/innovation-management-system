package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.ReviewDecision;
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
public class OpportunityReviewResponse {

    private UUID id;
    private UUID applicationId;
    private String applicationNumber;
    private LocalDate reviewDate;
    private ReviewDecision decision;
    private String remarks;
    private UUID reviewerId;
    private String reviewerName;
}

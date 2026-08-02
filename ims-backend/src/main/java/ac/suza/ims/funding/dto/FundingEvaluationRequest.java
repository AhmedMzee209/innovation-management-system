package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.FundingRecommendation;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
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
public class FundingEvaluationRequest {

    @NotNull(message = "Application ID is mandatory")
    private UUID applicationId;

    @NotNull(message = "Committee member ID is mandatory")
    private UUID committeeMemberId;

    @DecimalMin(value = "0.0") @DecimalMax(value = "100.0")
    private Double technicalScore;

    @DecimalMin(value = "0.0") @DecimalMax(value = "100.0")
    private Double businessScore;

    @DecimalMin(value = "0.0") @DecimalMax(value = "100.0")
    private Double financialScore;

    @DecimalMin(value = "0.0") @DecimalMax(value = "100.0")
    private Double innovationScore;

    @NotNull(message = "Recommendation is mandatory")
    private FundingRecommendation recommendation;

    private String remarks;
}

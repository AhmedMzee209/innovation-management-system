package ac.suza.ims.funding.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplyFundingRequest {

    @NotNull(message = "Startup ID is mandatory")
    private UUID startupId;

    @NotNull(message = "Program ID is mandatory")
    private UUID programId;

    @NotNull(message = "Requested amount is mandatory")
    @DecimalMin(value = "0.01", message = "Requested amount must be greater than zero")
    private BigDecimal requestedAmount;

    private String businessJustification;
    private String expectedOutcome;
}

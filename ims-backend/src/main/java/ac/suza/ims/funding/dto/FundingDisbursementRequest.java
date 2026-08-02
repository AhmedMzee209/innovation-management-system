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
public class FundingDisbursementRequest {

    @NotNull(message = "Application ID is mandatory")
    private UUID applicationId;

    @NotNull(message = "Disbursement amount is mandatory")
    @DecimalMin(value = "0.01", message = "Disbursement amount must be greater than zero")
    private BigDecimal amount;

    private String paymentMethod;
    private String transactionReference;
    private String remarks;
}

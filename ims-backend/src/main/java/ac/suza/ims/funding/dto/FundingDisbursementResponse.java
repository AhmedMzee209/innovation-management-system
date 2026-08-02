package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.DisbursementStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FundingDisbursementResponse {

    private UUID id;
    private String disbursementNumber;
    private UUID applicationId;
    private String applicationNumber;
    private BigDecimal amount;
    private LocalDate disbursementDate;
    private String paymentMethod;
    private String transactionReference;
    private String remarks;
    private DisbursementStatus status;
}

package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.FundingApplicationStatus;
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
public class FundingApplicationResponse {

    private UUID id;
    private String applicationNumber;
    private UUID startupId;
    private String startupName;
    private UUID programId;
    private String programName;
    private BigDecimal requestedAmount;
    private BigDecimal approvedAmount;
    private String businessJustification;
    private String expectedOutcome;
    private LocalDate submissionDate;
    private LocalDate decisionDate;
    private FundingApplicationStatus status;
}

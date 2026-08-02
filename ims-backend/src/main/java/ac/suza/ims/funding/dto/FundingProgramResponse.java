package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.FundingProgramStatus;
import ac.suza.ims.funding.entity.FundingType;
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
public class FundingProgramResponse {

    private UUID id;
    private String programCode;
    private String programName;
    private String description;
    private String sponsor;
    private FundingType fundingType;
    private BigDecimal maximumAmount;
    private BigDecimal minimumAmount;
    private LocalDate applicationOpenDate;
    private LocalDate applicationCloseDate;
    private LocalDate announcementDate;
    private FundingProgramStatus status;
}

package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.FundingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateFundingProgramRequest {

    @NotBlank(message = "Program name is mandatory")
    @Size(max = 255)
    private String programName;

    private String description;

    @Size(max = 255)
    private String sponsor;

    @NotNull(message = "Funding type is mandatory")
    private FundingType fundingType;

    private BigDecimal maximumAmount;
    private BigDecimal minimumAmount;

    private LocalDate applicationOpenDate;
    private LocalDate applicationCloseDate;
    private LocalDate announcementDate;
}

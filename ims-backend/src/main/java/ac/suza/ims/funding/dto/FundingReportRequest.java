package ac.suza.ims.funding.dto;

import jakarta.validation.constraints.NotBlank;
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
public class FundingReportRequest {

    @NotNull(message = "Application ID is mandatory")
    private UUID applicationId;

    @NotBlank(message = "Report title is mandatory")
    private String reportTitle;

    private String reportType;
    private String summary;
    private String achievements;
    private String challenges;
    private String recommendations;
}

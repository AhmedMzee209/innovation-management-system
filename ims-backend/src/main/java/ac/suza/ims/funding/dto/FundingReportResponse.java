package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.ReportStatus;
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
public class FundingReportResponse {

    private UUID id;
    private UUID applicationId;
    private String applicationNumber;
    private String reportTitle;
    private String reportType;
    private String summary;
    private String achievements;
    private String challenges;
    private String recommendations;
    private LocalDate submissionDate;
    private ReportStatus status;
}

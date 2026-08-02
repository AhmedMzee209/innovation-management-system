package ac.suza.ims.funding.dto;

import ac.suza.ims.funding.entity.FundingRecommendation;
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
public class FundingEvaluationResponse {

    private UUID id;
    private UUID applicationId;
    private String applicationNumber;
    private UUID committeeMemberId;
    private String committeeMemberName;
    private Double technicalScore;
    private Double businessScore;
    private Double financialScore;
    private Double innovationScore;
    private Double overallScore;
    private FundingRecommendation recommendation;
    private String remarks;
    private LocalDate evaluationDate;
}

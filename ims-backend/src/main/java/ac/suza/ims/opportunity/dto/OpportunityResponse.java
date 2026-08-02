package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.OpportunityStatus;
import ac.suza.ims.opportunity.entity.OpportunityType;
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
public class OpportunityResponse {

    private UUID id;
    private String opportunityCode;
    private String title;
    private String description;
    private String provider;
    private UUID categoryId;
    private String categoryName;
    private String country;
    private String city;
    private String website;
    private String contactEmail;
    private String applicationLink;
    private LocalDate applicationOpenDate;
    private LocalDate applicationCloseDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maximumParticipants;
    private OpportunityType opportunityType;
    private OpportunityStatus status;
}

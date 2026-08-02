package ac.suza.ims.opportunity.dto;

import ac.suza.ims.opportunity.entity.OpportunityType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class CreateOpportunityRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @NotBlank(message = "Provider is mandatory")
    @Size(max = 255)
    private String provider;

    private UUID categoryId;

    @Size(max = 100)
    private String country;

    @Size(max = 100)
    private String city;

    @Size(max = 255)
    private String website;

    @Email
    @Size(max = 150)
    private String contactEmail;

    @Size(max = 500)
    private String applicationLink;

    private LocalDate applicationOpenDate;

    @NotNull(message = "Application close date is mandatory")
    private LocalDate applicationCloseDate;

    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maximumParticipants;
    private OpportunityType opportunityType;
}

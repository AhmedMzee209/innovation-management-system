package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityEligibilityResponse;
import ac.suza.ims.opportunity.entity.OpportunityEligibility;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityEligibilityMapper {

    @Mapping(target = "opportunityId", source = "opportunity.id")
    OpportunityEligibilityResponse toResponse(OpportunityEligibility eligibility);
}

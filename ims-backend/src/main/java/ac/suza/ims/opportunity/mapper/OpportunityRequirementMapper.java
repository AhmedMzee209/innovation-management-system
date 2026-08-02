package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityRequirementResponse;
import ac.suza.ims.opportunity.entity.OpportunityRequirement;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityRequirementMapper {

    @Mapping(target = "opportunityId", source = "opportunity.id")
    OpportunityRequirementResponse toResponse(OpportunityRequirement requirement);
}

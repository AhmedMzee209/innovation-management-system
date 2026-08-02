package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.CreateOpportunityRequest;
import ac.suza.ims.opportunity.dto.OpportunityResponse;
import ac.suza.ims.opportunity.dto.OpportunitySummaryResponse;
import ac.suza.ims.opportunity.dto.UpdateOpportunityRequest;
import ac.suza.ims.opportunity.entity.Opportunity;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    OpportunityResponse toResponse(Opportunity opportunity);

    @Mapping(target = "categoryName", source = "category.name")
    OpportunitySummaryResponse toSummaryResponse(Opportunity opportunity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "opportunityCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Opportunity toEntity(CreateOpportunityRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "opportunityCode", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntityFromRequest(UpdateOpportunityRequest request, @MappingTarget Opportunity opportunity);
}

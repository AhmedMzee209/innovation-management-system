package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityApplicationRequest;
import ac.suza.ims.opportunity.dto.OpportunityApplicationResponse;
import ac.suza.ims.opportunity.entity.OpportunityApplication;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityApplicationMapper {

    @Mapping(target = "opportunityId", source = "opportunity.id")
    @Mapping(target = "opportunityTitle", source = "opportunity.title")
    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    OpportunityApplicationResponse toResponse(OpportunityApplication application);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "applicationNumber", ignore = true)
    @Mapping(target = "applicationDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "decisionDate", ignore = true)
    @Mapping(target = "opportunity", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    OpportunityApplication toEntity(OpportunityApplicationRequest request);
}

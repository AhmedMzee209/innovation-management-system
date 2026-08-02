package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.FundingMilestoneRequest;
import ac.suza.ims.funding.dto.FundingMilestoneResponse;
import ac.suza.ims.funding.entity.FundingMilestone;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingMilestoneMapper {

    @Mapping(target = "applicationId", source = "application.id")
    FundingMilestoneResponse toResponse(FundingMilestone milestone);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "completionDate", ignore = true)
    @Mapping(target = "application", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingMilestone toEntity(FundingMilestoneRequest request);
}

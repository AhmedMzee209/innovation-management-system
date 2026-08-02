package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.ApplyFundingRequest;
import ac.suza.ims.funding.dto.FundingApplicationResponse;
import ac.suza.ims.funding.entity.FundingApplication;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingApplicationMapper {

    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    @Mapping(target = "programId", source = "program.id")
    @Mapping(target = "programName", source = "program.programName")
    FundingApplicationResponse toResponse(FundingApplication application);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "applicationNumber", ignore = true)
    @Mapping(target = "approvedAmount", ignore = true)
    @Mapping(target = "submissionDate", ignore = true)
    @Mapping(target = "decisionDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "program", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingApplication toEntity(ApplyFundingRequest request);
}

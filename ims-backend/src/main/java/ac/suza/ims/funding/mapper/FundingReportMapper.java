package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.FundingReportRequest;
import ac.suza.ims.funding.dto.FundingReportResponse;
import ac.suza.ims.funding.entity.FundingReport;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingReportMapper {

    @Mapping(target = "applicationId", source = "application.id")
    @Mapping(target = "applicationNumber", source = "application.applicationNumber")
    FundingReportResponse toResponse(FundingReport report);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "submissionDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "application", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingReport toEntity(FundingReportRequest request);
}

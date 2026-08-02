package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.FundingDisbursementRequest;
import ac.suza.ims.funding.dto.FundingDisbursementResponse;
import ac.suza.ims.funding.entity.FundingDisbursement;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingDisbursementMapper {

    @Mapping(target = "applicationId", source = "application.id")
    @Mapping(target = "applicationNumber", source = "application.applicationNumber")
    FundingDisbursementResponse toResponse(FundingDisbursement disbursement);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "disbursementNumber", ignore = true)
    @Mapping(target = "disbursementDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "application", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingDisbursement toEntity(FundingDisbursementRequest request);
}

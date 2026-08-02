package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.CreateFundingProgramRequest;
import ac.suza.ims.funding.dto.FundingProgramResponse;
import ac.suza.ims.funding.entity.FundingProgram;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingProgramMapper {

    FundingProgramResponse toResponse(FundingProgram program);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "programCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingProgram toEntity(CreateFundingProgramRequest request);
}

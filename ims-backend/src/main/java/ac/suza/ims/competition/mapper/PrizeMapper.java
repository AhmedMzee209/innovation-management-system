package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.PrizeRequest;
import ac.suza.ims.competition.dto.PrizeResponse;
import ac.suza.ims.competition.entity.Prize;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface PrizeMapper {

    @Mapping(target = "competitionId", source = "competition.id")
    PrizeResponse toResponse(Prize prize);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "competition", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Prize toEntity(PrizeRequest request);
}

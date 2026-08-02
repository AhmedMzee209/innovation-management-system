package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.JudgeRequest;
import ac.suza.ims.competition.dto.JudgeResponse;
import ac.suza.ims.competition.entity.Judge;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface JudgeMapper {

    @Mapping(target = "userId", source = "user.id")
    JudgeResponse toResponse(Judge judge);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "judgeCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Judge toEntity(JudgeRequest request);
}

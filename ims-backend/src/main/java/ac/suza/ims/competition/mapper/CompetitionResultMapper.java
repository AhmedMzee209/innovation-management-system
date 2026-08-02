package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.CompetitionResultResponse;
import ac.suza.ims.competition.entity.CompetitionResult;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface CompetitionResultMapper {

    @Mapping(target = "competitionId", source = "competition.id")
    @Mapping(target = "competitionTitle", source = "competition.title")
    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    CompetitionResultResponse toResponse(CompetitionResult result);
}

package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.CompetitionResponse;
import ac.suza.ims.competition.dto.CreateCompetitionRequest;
import ac.suza.ims.competition.entity.Competition;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface CompetitionMapper {

    CompetitionResponse toResponse(Competition competition);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "competitionCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Competition toEntity(CreateCompetitionRequest request);
}

package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.CompetitionEvaluationResponse;
import ac.suza.ims.competition.entity.CompetitionEvaluation;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface CompetitionEvaluationMapper {

    @Mapping(target = "judgeAssignmentId", source = "judgeAssignment.id")
    @Mapping(target = "registrationId", source = "registration.id")
    @Mapping(target = "startupName", source = "registration.startup.startupName")
    @Mapping(target = "scores", ignore = true)
    CompetitionEvaluationResponse toResponse(CompetitionEvaluation evaluation);
}

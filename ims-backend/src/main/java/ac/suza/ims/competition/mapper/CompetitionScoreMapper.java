package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.CompetitionEvaluationResponse;
import ac.suza.ims.competition.entity.CompetitionScore;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface CompetitionScoreMapper {

    CompetitionEvaluationResponse.ScoreResponseDto toResponse(CompetitionScore score);
}

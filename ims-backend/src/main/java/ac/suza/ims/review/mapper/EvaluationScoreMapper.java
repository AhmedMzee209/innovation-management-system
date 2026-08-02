package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.EvaluationScoreResponse;
import ac.suza.ims.review.entity.EvaluationScore;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface EvaluationScoreMapper {

    @Mapping(target = "criteriaId", source = "criteria.id")
    @Mapping(target = "criteriaName", source = "criteria.name")
    @Mapping(target = "criteriaMaximumScore", source = "criteria.maximumScore")
    @Mapping(target = "criteriaWeight", source = "criteria.weight")
    EvaluationScoreResponse toResponse(EvaluationScore score);
}

package ac.suza.ims.review.mapper;

import ac.suza.ims.review.dto.EvaluationCriteriaRequest;
import ac.suza.ims.review.dto.EvaluationCriteriaResponse;
import ac.suza.ims.review.entity.EvaluationCriteria;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface EvaluationCriteriaMapper {

    EvaluationCriteriaResponse toResponse(EvaluationCriteria criteria);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    EvaluationCriteria toEntity(EvaluationCriteriaRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(EvaluationCriteriaRequest request, @MappingTarget EvaluationCriteria criteria);
}

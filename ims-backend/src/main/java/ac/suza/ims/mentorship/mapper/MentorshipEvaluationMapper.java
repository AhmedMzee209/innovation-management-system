package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.MentorshipEvaluationRequest;
import ac.suza.ims.mentorship.dto.MentorshipEvaluationResponse;
import ac.suza.ims.mentorship.entity.MentorshipEvaluation;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MentorshipEvaluationMapper {

    @Mapping(target = "sessionId", source = "session.id")
    @Mapping(target = "sessionTitle", source = "session.sessionTitle")
    MentorshipEvaluationResponse toResponse(MentorshipEvaluation evaluation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "evaluationDate", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    MentorshipEvaluation toEntity(MentorshipEvaluationRequest request);
}

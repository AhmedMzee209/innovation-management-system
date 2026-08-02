package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.MentorFeedbackRequest;
import ac.suza.ims.mentorship.dto.MentorFeedbackResponse;
import ac.suza.ims.mentorship.entity.MentorFeedback;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MentorFeedbackMapper {

    @Mapping(target = "sessionId", source = "session.id")
    @Mapping(target = "sessionTitle", source = "session.sessionTitle")
    MentorFeedbackResponse toResponse(MentorFeedback feedback);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "feedbackDate", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    MentorFeedback toEntity(MentorFeedbackRequest request);
}

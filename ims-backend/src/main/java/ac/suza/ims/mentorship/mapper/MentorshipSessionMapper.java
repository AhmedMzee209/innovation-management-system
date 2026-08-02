package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.CreateSessionRequest;
import ac.suza.ims.mentorship.dto.SessionResponse;
import ac.suza.ims.mentorship.entity.MentorshipSession;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MentorshipSessionMapper {

    @Mapping(target = "assignmentId", source = "assignment.id")
    @Mapping(target = "mentorName", expression = "java(session.getAssignment() != null && session.getAssignment().getMentor() != null && session.getAssignment().getMentor().getUser() != null ? session.getAssignment().getMentor().getUser().getFirstName() + ' ' + session.getAssignment().getMentor().getUser().getLastName() : null)")
    @Mapping(target = "startupName", expression = "java(session.getAssignment() != null && session.getAssignment().getStartup() != null ? session.getAssignment().getStartup().getStartupName() : null)")
    SessionResponse toResponse(MentorshipSession session);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "summary", ignore = true)
    @Mapping(target = "nextMeetingDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assignment", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    MentorshipSession toEntity(CreateSessionRequest request);
}

package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.MentorAssignmentResponse;
import ac.suza.ims.mentorship.entity.MentorAssignment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MentorAssignmentMapper {

    @Mapping(target = "mentorId", source = "mentor.id")
    @Mapping(target = "mentorCode", source = "mentor.mentorCode")
    @Mapping(target = "mentorName", expression = "java(assignment.getMentor() != null && assignment.getMentor().getUser() != null ? assignment.getMentor().getUser().getFirstName() + ' ' + assignment.getMentor().getUser().getLastName() : null)")
    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupCode", source = "startup.startupCode")
    @Mapping(target = "startupName", source = "startup.startupName")
    @Mapping(target = "assignedByName", expression = "java(assignment.getAssignedBy() != null ? assignment.getAssignedBy().getFirstName() + ' ' + assignment.getAssignedBy().getLastName() : null)")
    MentorAssignmentResponse toResponse(MentorAssignment assignment);
}

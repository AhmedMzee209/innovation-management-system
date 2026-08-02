package ac.suza.ims.mentorship.mapper;

import ac.suza.ims.mentorship.dto.CreateMentorRequest;
import ac.suza.ims.mentorship.dto.MentorResponse;
import ac.suza.ims.mentorship.dto.UpdateMentorRequest;
import ac.suza.ims.mentorship.entity.Mentor;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface MentorMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", expression = "java(mentor.getUser() != null ? mentor.getUser().getFirstName() + ' ' + mentor.getUser().getLastName() : null)")
    @Mapping(target = "email", source = "user.email")
    MentorResponse toResponse(Mentor mentor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "mentorCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Mentor toEntity(CreateMentorRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "mentorCode", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(UpdateMentorRequest request, @MappingTarget Mentor mentor);
}

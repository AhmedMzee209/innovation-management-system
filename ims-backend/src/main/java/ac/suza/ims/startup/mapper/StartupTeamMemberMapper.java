package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.StartupTeamMemberRequest;
import ac.suza.ims.startup.dto.StartupTeamMemberResponse;
import ac.suza.ims.startup.entity.StartupTeamMember;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface StartupTeamMemberMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(member.getUser() != null ? member.getUser().getFirstName() + ' ' + member.getUser().getLastName() : null)")
    @Mapping(target = "userEmail", source = "user.email")
    StartupTeamMemberResponse toResponse(StartupTeamMember member);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    StartupTeamMember toEntity(StartupTeamMemberRequest request);
}

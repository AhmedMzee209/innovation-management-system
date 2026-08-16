package ac.suza.ims.innovation.mapper;

import ac.suza.ims.innovation.dto.InnovationTeamMemberRequest;
import ac.suza.ims.innovation.dto.InnovationTeamMemberResponse;
import ac.suza.ims.innovation.entity.InnovationTeamMember;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface InnovationTeamMemberMapper {

    InnovationTeamMemberResponse toResponse(InnovationTeamMember member);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "joinedDate", ignore = true)
    @Mapping(target = "innovation", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    InnovationTeamMember toEntity(InnovationTeamMemberRequest request);
}

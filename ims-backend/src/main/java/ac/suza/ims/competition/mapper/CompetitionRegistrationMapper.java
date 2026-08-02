package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.CompetitionRegistrationRequest;
import ac.suza.ims.competition.dto.CompetitionRegistrationResponse;
import ac.suza.ims.competition.entity.CompetitionRegistration;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface CompetitionRegistrationMapper {

    @Mapping(target = "competitionId", source = "competition.id")
    @Mapping(target = "competitionTitle", source = "competition.title")
    @Mapping(target = "startupId", source = "startup.id")
    @Mapping(target = "startupName", source = "startup.startupName")
    CompetitionRegistrationResponse toResponse(CompetitionRegistration registration);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "registrationNumber", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "competition", ignore = true)
    @Mapping(target = "startup", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    CompetitionRegistration toEntity(CompetitionRegistrationRequest request);
}

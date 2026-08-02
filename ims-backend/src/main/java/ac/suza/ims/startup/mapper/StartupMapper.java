package ac.suza.ims.startup.mapper;

import ac.suza.ims.startup.dto.CreateStartupRequest;
import ac.suza.ims.startup.dto.StartupResponse;
import ac.suza.ims.startup.dto.StartupSummaryResponse;
import ac.suza.ims.startup.dto.UpdateStartupRequest;
import ac.suza.ims.startup.entity.Startup;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {StartupStageMapper.class, StartupTeamMemberMapper.class, StartupMilestoneMapper.class, StartupAchievementMapper.class, StartupProgressMapper.class},
        builder = @Builder(disableBuilder = true))
public interface StartupMapper {

    @Mapping(target = "innovationId", source = "innovation.id")
    @Mapping(target = "innovationCode", source = "innovation.innovationCode")
    @Mapping(target = "innovationTitle", source = "innovation.title")
    @Mapping(target = "hubId", source = "hub.id")
    @Mapping(target = "hubName", source = "hub.name")
    @Mapping(target = "schoolId", source = "school.id")
    @Mapping(target = "schoolName", source = "school.name")
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(target = "managerName", expression = "java(startup.getManager() != null ? startup.getManager().getFirstName() + ' ' + startup.getManager().getLastName() : null)")
    @Mapping(target = "teamMembers", ignore = true)
    @Mapping(target = "milestones", ignore = true)
    @Mapping(target = "achievements", ignore = true)
    @Mapping(target = "progressRecords", ignore = true)
    StartupResponse toResponse(Startup startup);

    @Mapping(target = "innovationId", source = "innovation.id")
    @Mapping(target = "innovationCode", source = "innovation.innovationCode")
    @Mapping(target = "innovationTitle", source = "innovation.title")
    @Mapping(target = "stageName", source = "currentStage.name")
    @Mapping(target = "schoolName", source = "school.name")
    @Mapping(target = "hubName", source = "hub.name")
    StartupSummaryResponse toSummaryResponse(Startup startup);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startupCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "innovation", ignore = true)
    @Mapping(target = "hub", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "currentStage", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Startup toEntity(CreateStartupRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "startupCode", ignore = true)
    @Mapping(target = "innovation", ignore = true)
    @Mapping(target = "hub", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "currentStage", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(UpdateStartupRequest request, @MappingTarget Startup startup);
}

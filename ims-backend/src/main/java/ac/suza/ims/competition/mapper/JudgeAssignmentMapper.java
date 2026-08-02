package ac.suza.ims.competition.mapper;

import ac.suza.ims.competition.dto.JudgeAssignmentResponse;
import ac.suza.ims.competition.entity.JudgeAssignment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface JudgeAssignmentMapper {

    @Mapping(target = "competitionId", source = "competition.id")
    @Mapping(target = "competitionTitle", source = "competition.title")
    @Mapping(target = "judgeId", source = "judge.id")
    @Mapping(target = "judgeCode", source = "judge.judgeCode")
    @Mapping(target = "judgeName", expression = "java(assignment.getJudge() != null && assignment.getJudge().getUser() != null ? assignment.getJudge().getUser().getFirstName() + ' ' + assignment.getJudge().getUser().getLastName() : assignment.getJudge().getTitle() + ' ' + assignment.getJudge().getDesignation())")
    JudgeAssignmentResponse toResponse(JudgeAssignment assignment);
}

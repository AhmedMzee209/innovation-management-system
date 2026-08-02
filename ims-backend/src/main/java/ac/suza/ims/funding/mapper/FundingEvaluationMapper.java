package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.dto.FundingEvaluationRequest;
import ac.suza.ims.funding.dto.FundingEvaluationResponse;
import ac.suza.ims.funding.entity.FundingEvaluation;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingEvaluationMapper {

    @Mapping(target = "applicationId", source = "application.id")
    @Mapping(target = "applicationNumber", source = "application.applicationNumber")
    @Mapping(target = "committeeMemberId", source = "committeeMember.id")
    @Mapping(target = "committeeMemberName", expression = "java(evaluation.getCommitteeMember() != null && evaluation.getCommitteeMember().getUser() != null ? evaluation.getCommitteeMember().getUser().getFirstName() + ' ' + evaluation.getCommitteeMember().getUser().getLastName() : null)")
    FundingEvaluationResponse toResponse(FundingEvaluation evaluation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "overallScore", ignore = true)
    @Mapping(target = "evaluationDate", ignore = true)
    @Mapping(target = "application", ignore = true)
    @Mapping(target = "committeeMember", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    FundingEvaluation toEntity(FundingEvaluationRequest request);
}

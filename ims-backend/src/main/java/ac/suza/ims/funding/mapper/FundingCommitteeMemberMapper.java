package ac.suza.ims.funding.mapper;

import ac.suza.ims.funding.entity.FundingCommitteeMember;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface FundingCommitteeMemberMapper {

}

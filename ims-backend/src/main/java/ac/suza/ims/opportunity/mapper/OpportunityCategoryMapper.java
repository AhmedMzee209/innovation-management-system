package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityCategoryResponse;
import ac.suza.ims.opportunity.entity.OpportunityCategory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityCategoryMapper {

    OpportunityCategoryResponse toResponse(OpportunityCategory category);
}

package ac.suza.ims.opportunity.mapper;

import ac.suza.ims.opportunity.dto.OpportunityDocumentResponse;
import ac.suza.ims.opportunity.entity.OpportunityDocument;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface OpportunityDocumentMapper {

    @Mapping(target = "applicationId", source = "application.id")
    OpportunityDocumentResponse toResponse(OpportunityDocument document);
}

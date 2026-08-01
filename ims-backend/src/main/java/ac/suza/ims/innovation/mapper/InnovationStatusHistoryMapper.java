package ac.suza.ims.innovation.mapper;

import ac.suza.ims.innovation.dto.InnovationStatusHistoryResponse;
import ac.suza.ims.innovation.entity.InnovationStatusHistory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface InnovationStatusHistoryMapper {

    @Mapping(target = "changedById", source = "changedBy.id")
    @Mapping(target = "changedByName", expression = "java(history.getChangedBy().getFirstName() + ' ' + history.getChangedBy().getLastName())")
    InnovationStatusHistoryResponse toResponse(InnovationStatusHistory history);
}

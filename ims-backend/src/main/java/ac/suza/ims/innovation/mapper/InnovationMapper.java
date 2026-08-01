package ac.suza.ims.innovation.mapper;

import ac.suza.ims.innovation.dto.CreateInnovationRequest;
import ac.suza.ims.innovation.dto.InnovationResponse;
import ac.suza.ims.innovation.dto.InnovationSummaryResponse;
import ac.suza.ims.innovation.dto.UpdateInnovationRequest;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.organization.mapper.DepartmentMapper;
import ac.suza.ims.organization.mapper.InnovationHubMapper;
import ac.suza.ims.organization.mapper.SchoolMapper;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
                SchoolMapper.class, 
                DepartmentMapper.class, 
                InnovationHubMapper.class, 
                InnovationCategoryMapper.class,
                InnovationDocumentMapper.class,
                InnovationStatusHistoryMapper.class
        },
        builder = @Builder(disableBuilder = true))
public interface InnovationMapper {

    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "ownerName", expression = "java(innovation.getOwner().getFirstName() + ' ' + innovation.getOwner().getLastName())")
    @Mapping(target = "ownerEmail", source = "owner.email")
    InnovationResponse toResponse(Innovation innovation);

    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "ownerName", expression = "java(innovation.getOwner().getFirstName() + ' ' + innovation.getOwner().getLastName())")
    @Mapping(target = "schoolName", source = "school.name")
    InnovationSummaryResponse toSummaryResponse(Innovation innovation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "innovationCode", ignore = true)
    @Mapping(target = "currentStatus", ignore = true)
    @Mapping(target = "submissionDate", ignore = true)
    @Mapping(target = "approvalDate", ignore = true)
    @Mapping(target = "remarks", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "department", ignore = true)
    @Mapping(target = "hub", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "statusHistory", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Innovation toEntity(CreateInnovationRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "innovationCode", ignore = true)
    @Mapping(target = "currentStatus", ignore = true)
    @Mapping(target = "submissionDate", ignore = true)
    @Mapping(target = "approvalDate", ignore = true)
    @Mapping(target = "remarks", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "school", ignore = true)
    @Mapping(target = "department", ignore = true)
    @Mapping(target = "hub", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "statusHistory", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void updateEntity(UpdateInnovationRequest request, @MappingTarget Innovation innovation);
}

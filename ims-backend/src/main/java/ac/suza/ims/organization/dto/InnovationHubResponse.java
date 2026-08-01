package ac.suza.ims.organization.dto;

import ac.suza.ims.organization.entity.HubStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class InnovationHubResponse {
    private UUID id;
    private String code;
    private String name;
    private String description;
    private String vision;
    private String mission;
    private String officeLocation;
    private String email;
    private String phone;
    private HubStatus status;
    private SchoolResponse school;
}

package ac.suza.ims.organization.dto;

import ac.suza.ims.organization.entity.SchoolStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class SchoolResponse {
    private UUID id;
    private String code;
    private String name;
    private String shortName;
    private String description;
    private String email;
    private String phoneNumber;
    private String website;
    private String physicalAddress;
    private String logo;
    private SchoolStatus status;
}

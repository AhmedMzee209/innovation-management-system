package ac.suza.ims.innovation.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class InnovationTeamMemberResponse {
    private UUID id;
    private String name;
    private String email;
    private String role;
    private LocalDateTime joinedDate;
}

package ac.suza.ims.organization.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class HubManagerAssignmentResponse {
    private UUID id;
    private InnovationHubResponse hub;
    private ManagerSummary manager;
    private String roleTitle;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean active;

    @Data @Builder @AllArgsConstructor @NoArgsConstructor
    public static class ManagerSummary {
        private UUID id;
        private String firstName;
        private String lastName;
        private String email;
    }
}

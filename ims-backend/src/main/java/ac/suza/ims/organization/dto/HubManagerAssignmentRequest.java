package ac.suza.ims.organization.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class HubManagerAssignmentRequest {

    @NotNull(message = "Hub ID is mandatory")
    private UUID hubId;

    @NotNull(message = "Manager (User) ID is mandatory")
    private UUID managerId;

    @Size(max = 100)
    private String roleTitle;

    @NotNull(message = "Start date is mandatory")
    private LocalDate startDate;

    private LocalDate endDate;
}

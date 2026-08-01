package ac.suza.ims.innovation.dto;

import ac.suza.ims.innovation.entity.InnovationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationStatusHistoryResponse {
    private UUID id;
    private InnovationStatus previousStatus;
    private InnovationStatus currentStatus;
    private String remarks;
    private UUID changedById;
    private String changedByName;
    private LocalDateTime changedDate;
}

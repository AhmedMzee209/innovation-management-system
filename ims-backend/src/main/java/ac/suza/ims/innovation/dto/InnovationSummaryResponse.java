package ac.suza.ims.innovation.dto;

import ac.suza.ims.innovation.entity.InnovationLevel;
import ac.suza.ims.innovation.entity.InnovationStatus;
import ac.suza.ims.innovation.entity.InnovationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationSummaryResponse {
    private UUID id;
    private String innovationCode;
    private String title;
    private InnovationLevel innovationLevel;
    private InnovationType innovationType;
    private InnovationStatus currentStatus;
    private String categoryName;
    private String ownerName;
    private String schoolName;
    private LocalDateTime submissionDate;
}

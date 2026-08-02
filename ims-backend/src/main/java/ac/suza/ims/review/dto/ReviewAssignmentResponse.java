package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.AssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReviewAssignmentResponse {
    private UUID id;
    private LocalDate assignmentDate;
    private LocalDate deadline;
    private AssignmentStatus status;
    private UUID innovationId;
    private String innovationTitle;
    private String innovationCode;
    private UUID reviewerId;
    private String reviewerName;
    private UUID assignedById;
    private String assignedByName;
}

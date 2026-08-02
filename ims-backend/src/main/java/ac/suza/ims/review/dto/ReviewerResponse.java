package ac.suza.ims.review.dto;

import ac.suza.ims.review.entity.ReviewerStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReviewerResponse {
    private UUID id;
    private String employeeNumber;
    private String designation;
    private String specialization;
    private Integer yearsOfExperience;
    private ReviewerStatus status;
    private UUID userId;
    private String userFullName;
    private String userEmail;
}

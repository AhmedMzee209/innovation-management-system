package ac.suza.ims.review.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CreateReviewerRequest {

    @NotNull(message = "User ID is mandatory")
    private UUID userId;

    @NotBlank(message = "Employee number is mandatory")
    @Size(max = 50)
    private String employeeNumber;

    @Size(max = 100)
    private String designation;

    @Size(max = 255)
    private String specialization;

    private Integer yearsOfExperience;
}

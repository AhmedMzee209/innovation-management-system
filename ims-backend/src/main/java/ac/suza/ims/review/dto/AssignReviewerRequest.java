package ac.suza.ims.review.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AssignReviewerRequest {

    @NotNull(message = "Innovation ID is mandatory")
    private UUID innovationId;

    @NotNull(message = "Reviewer ID is mandatory")
    private UUID reviewerId;

    @FutureOrPresent(message = "Deadline must be today or in the future")
    private LocalDate deadline;
}

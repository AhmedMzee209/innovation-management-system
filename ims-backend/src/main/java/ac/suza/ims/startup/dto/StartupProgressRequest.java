package ac.suza.ims.startup.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupProgressRequest {

    private LocalDate progressDate;

    @NotNull(message = "Progress percentage is mandatory")
    @DecimalMin(value = "0.0", message = "Progress percentage cannot be less than 0%")
    @DecimalMax(value = "100.0", message = "Progress percentage cannot exceed 100%")
    private Double progressPercentage;

    private String summary;
    private String challenges;
    private String nextSteps;
}

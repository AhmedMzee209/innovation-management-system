package ac.suza.ims.startup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupProgressResponse {

    private UUID id;
    private LocalDate progressDate;
    private Double progressPercentage;
    private String summary;
    private String challenges;
    private String nextSteps;
}

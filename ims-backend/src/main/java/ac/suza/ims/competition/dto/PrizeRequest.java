package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.PrizeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrizeRequest {

    private UUID competitionId;

    @NotBlank(message = "Prize title is mandatory")
    @Size(max = 255)
    private String title;

    private String description;

    @NotNull(message = "Prize type is mandatory")
    private PrizeType prizeType;

    private BigDecimal amount;

    @Size(max = 255)
    private String sponsor;
}

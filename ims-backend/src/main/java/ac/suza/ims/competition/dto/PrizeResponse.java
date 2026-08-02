package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.PrizeType;
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
public class PrizeResponse {

    private UUID id;
    private UUID competitionId;
    private String title;
    private String description;
    private PrizeType prizeType;
    private BigDecimal amount;
    private String sponsor;
}

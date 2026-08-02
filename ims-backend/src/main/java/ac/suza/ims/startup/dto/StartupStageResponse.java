package ac.suza.ims.startup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartupStageResponse {

    private UUID id;
    private String name;
    private String description;
    private Integer orderNumber;
}

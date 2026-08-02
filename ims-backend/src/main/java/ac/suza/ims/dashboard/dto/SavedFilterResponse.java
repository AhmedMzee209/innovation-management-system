package ac.suza.ims.dashboard.dto;

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
public class SavedFilterResponse {

    private UUID id;
    private String filterName;
    private String module;
    private String filterDefinition;
    private LocalDate createdDate;
    private UUID userId;
}

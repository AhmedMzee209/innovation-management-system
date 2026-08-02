package ac.suza.ims.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedFilterRequest {

    @NotBlank(message = "Filter name is mandatory")
    @Size(max = 150)
    private String filterName;

    @NotBlank(message = "Module is mandatory")
    @Size(max = 50)
    private String module;

    @NotBlank(message = "Filter definition is mandatory")
    private String filterDefinition;
}

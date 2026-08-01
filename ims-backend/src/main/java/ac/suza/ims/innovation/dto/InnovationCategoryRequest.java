package ac.suza.ims.innovation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationCategoryRequest {

    @NotBlank(message = "Category name is mandatory")
    @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @Size(max = 50)
    private String icon;

    @Size(max = 20)
    private String color;
}

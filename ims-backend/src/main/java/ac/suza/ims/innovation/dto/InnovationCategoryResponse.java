package ac.suza.ims.innovation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class InnovationCategoryResponse {
    private UUID id;
    private String name;
    private String description;
    private String icon;
    private String color;
}

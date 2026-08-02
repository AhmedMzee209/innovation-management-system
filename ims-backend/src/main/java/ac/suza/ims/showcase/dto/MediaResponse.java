package ac.suza.ims.showcase.dto;

import ac.suza.ims.showcase.entity.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaResponse {
    private UUID id;
    private MediaType mediaType;
    private String title;
    private String fileName;
    private String storagePath;
    private String thumbnail;
    private Integer displayOrder;
}

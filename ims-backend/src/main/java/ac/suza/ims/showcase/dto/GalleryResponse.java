package ac.suza.ims.showcase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryResponse {
    private UUID id;
    private String galleryTitle;
    private String description;
    private Integer displayOrder;
    private List<MediaResponse> mediaList;
}

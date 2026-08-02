package ac.suza.ims.showcase.service;

import ac.suza.ims.showcase.dto.GalleryResponse;
import java.util.List;
import java.util.UUID;

public interface GalleryService {
    List<GalleryResponse> getAllGalleries();
    GalleryResponse getGalleryById(UUID id);
}

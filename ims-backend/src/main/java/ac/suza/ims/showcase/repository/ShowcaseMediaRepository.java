package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShowcaseMediaRepository extends JpaRepository<ShowcaseMedia, UUID> {
    List<ShowcaseMedia> findByShowcaseItemIdOrderByDisplayOrderAsc(UUID showcaseItemId);
    List<ShowcaseMedia> findByGalleryIdOrderByDisplayOrderAsc(UUID galleryId);
}

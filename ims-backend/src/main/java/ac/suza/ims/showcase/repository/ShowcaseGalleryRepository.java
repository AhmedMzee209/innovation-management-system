package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShowcaseGalleryRepository extends JpaRepository<ShowcaseGallery, UUID> {
    List<ShowcaseGallery> findAllByOrderByDisplayOrderAsc();
}

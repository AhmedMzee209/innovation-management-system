package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseItem;
import ac.suza.ims.showcase.entity.ShowcaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShowcaseItemRepository extends JpaRepository<ShowcaseItem, UUID> {
    Optional<ShowcaseItem> findBySlug(String slug);
    List<ShowcaseItem> findByStatusAndPublishedTrueOrderByPublishedDateDesc(ShowcaseStatus status);
    List<ShowcaseItem> findByFeaturedTrueAndPublishedTrueAndStatusOrderByDisplayOrderAsc(ShowcaseStatus status);
    List<ShowcaseItem> findByCategoryIdAndPublishedTrueAndStatus(UUID categoryId, ShowcaseStatus status);
    boolean existsBySlug(String slug);
}

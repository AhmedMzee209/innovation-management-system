package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.SuccessStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SuccessStoryRepository extends JpaRepository<SuccessStory, UUID> {
    List<SuccessStory> findByFeaturedTrueOrderByPublishDateDesc();
    List<SuccessStory> findAllByOrderByPublishDateDesc();
}

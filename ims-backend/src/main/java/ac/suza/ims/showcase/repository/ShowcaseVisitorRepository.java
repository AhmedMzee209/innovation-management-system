package ac.suza.ims.showcase.repository;

import ac.suza.ims.showcase.entity.ShowcaseVisitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ShowcaseVisitorRepository extends JpaRepository<ShowcaseVisitor, UUID> {
}

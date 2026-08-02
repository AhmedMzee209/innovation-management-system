package ac.suza.ims.review.repository;

import ac.suza.ims.review.entity.Reviewer;
import ac.suza.ims.review.entity.ReviewerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewerRepository extends JpaRepository<Reviewer, UUID> {
    Optional<Reviewer> findByEmployeeNumber(String employeeNumber);
    Optional<Reviewer> findByUserId(UUID userId);
    boolean existsByEmployeeNumber(String employeeNumber);
    boolean existsByUserId(UUID userId);
    List<Reviewer> findByStatus(ReviewerStatus status);
}

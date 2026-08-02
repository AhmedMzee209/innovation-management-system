package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.MentorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MentorFeedbackRepository extends JpaRepository<MentorFeedback, UUID> {

    Optional<MentorFeedback> findBySessionId(UUID sessionId);

    boolean existsBySessionId(UUID sessionId);
}

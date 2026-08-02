package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.MentorshipEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MentorshipEvaluationRepository extends JpaRepository<MentorshipEvaluation, UUID> {

    Optional<MentorshipEvaluation> findBySessionId(UUID sessionId);

    boolean existsBySessionId(UUID sessionId);
}

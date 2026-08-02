package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.Mentor;
import ac.suza.ims.mentorship.entity.MentorStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, UUID>, JpaSpecificationExecutor<Mentor> {

    Optional<Mentor> findByMentorCode(String mentorCode);

    Optional<Mentor> findByUserId(UUID userId);

    boolean existsByMentorCode(String mentorCode);

    boolean existsByUserId(UUID userId);

    List<Mentor> findByStatus(MentorStatus status);
}

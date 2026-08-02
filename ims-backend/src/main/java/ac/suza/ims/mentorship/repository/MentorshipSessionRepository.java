package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.MentorshipSession;
import ac.suza.ims.mentorship.entity.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MentorshipSessionRepository extends JpaRepository<MentorshipSession, UUID> {

    List<MentorshipSession> findByAssignmentId(UUID assignmentId);

    List<MentorshipSession> findByAssignmentIdAndStatus(UUID assignmentId, SessionStatus status);

    List<MentorshipSession> findByAssignmentMentorId(UUID mentorId);

    List<MentorshipSession> findByAssignmentStartupId(UUID startupId);
}

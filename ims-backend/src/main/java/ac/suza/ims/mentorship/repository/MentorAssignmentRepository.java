package ac.suza.ims.mentorship.repository;

import ac.suza.ims.mentorship.entity.AssignmentStatus;
import ac.suza.ims.mentorship.entity.MentorAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MentorAssignmentRepository extends JpaRepository<MentorAssignment, UUID> {

    List<MentorAssignment> findByMentorId(UUID mentorId);

    List<MentorAssignment> findByStartupId(UUID startupId);

    List<MentorAssignment> findByMentorIdAndStatus(UUID mentorId, AssignmentStatus status);

    List<MentorAssignment> findByStartupIdAndStatus(UUID startupId, AssignmentStatus status);

    Optional<MentorAssignment> findByMentorIdAndStartupIdAndStatus(UUID mentorId, UUID startupId, AssignmentStatus status);

    boolean existsByMentorIdAndStartupIdAndStatus(UUID mentorId, UUID startupId, AssignmentStatus status);
}

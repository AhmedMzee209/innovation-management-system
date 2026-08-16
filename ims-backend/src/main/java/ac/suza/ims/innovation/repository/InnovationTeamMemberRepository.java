package ac.suza.ims.innovation.repository;

import ac.suza.ims.innovation.entity.InnovationTeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InnovationTeamMemberRepository extends JpaRepository<InnovationTeamMember, UUID> {
    List<InnovationTeamMember> findByInnovationId(UUID innovationId);
    boolean existsByInnovationIdAndEmail(UUID innovationId, String email);
}

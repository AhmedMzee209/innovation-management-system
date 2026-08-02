package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.Prize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PrizeRepository extends JpaRepository<Prize, UUID> {

    List<Prize> findByCompetitionId(UUID competitionId);
}

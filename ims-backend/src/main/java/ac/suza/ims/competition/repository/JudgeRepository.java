package ac.suza.ims.competition.repository;

import ac.suza.ims.competition.entity.Judge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JudgeRepository extends JpaRepository<Judge, UUID> {

    Optional<Judge> findByJudgeCode(String judgeCode);

    Optional<Judge> findByUserId(UUID userId);

    boolean existsByJudgeCode(String judgeCode);
}

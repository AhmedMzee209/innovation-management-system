package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "competitions",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_competition_code", columnNames = "competition_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competitions SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Competition extends BaseEntity {

    @NotBlank(message = "Competition code is mandatory")
    @Size(max = 50)
    @Column(name = "competition_code", nullable = false, unique = true, length = 50)
    private String competitionCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 255)
    @Column(length = 255)
    private String theme;

    @Size(max = 255)
    @Column(length = 255)
    private String organizer;

    @Size(max = 255)
    @Column(length = 255)
    private String venue;

    @Column(name = "registration_open_date")
    private LocalDate registrationOpenDate;

    @Column(name = "registration_close_date")
    private LocalDate registrationCloseDate;

    @NotNull(message = "Competition date is mandatory")
    @Column(name = "competition_date", nullable = false)
    private LocalDate competitionDate;

    @Column(name = "announcement_date")
    private LocalDate announcementDate;

    @Column(name = "maximum_participants")
    private Integer maximumParticipants;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private CompetitionStatus status = CompetitionStatus.DRAFT;
}

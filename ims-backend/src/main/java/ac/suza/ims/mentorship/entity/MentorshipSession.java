package ac.suza.ims.mentorship.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "mentorship_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mentorship_sessions SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class MentorshipSession extends BaseEntity {

    @NotBlank(message = "Session title is mandatory")
    @Size(max = 255)
    @Column(name = "session_title", nullable = false, length = 255)
    private String sessionTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "session_type", nullable = false, length = 50)
    @Builder.Default
    private SessionType sessionType = SessionType.ONLINE;

    @NotNull(message = "Session date is mandatory")
    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Size(max = 500)
    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Size(max = 255)
    @Column(length = 255)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String agenda;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "next_meeting_date")
    private LocalDate nextMeetingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private SessionStatus status = SessionStatus.SCHEDULED;

    // Relationships
    @NotNull(message = "Mentor assignment is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assignment_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_session_assignment"))
    private MentorAssignment assignment;
}

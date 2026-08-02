package ac.suza.ims.mentorship.dto;

import ac.suza.ims.mentorship.entity.SessionStatus;
import ac.suza.ims.mentorship.entity.SessionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {

    private UUID id;
    private UUID assignmentId;
    private String mentorName;
    private String startupName;
    private String sessionTitle;
    private SessionType sessionType;
    private LocalDate sessionDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String meetingLink;
    private String location;
    private String agenda;
    private String summary;
    private LocalDate nextMeetingDate;
    private SessionStatus status;
}

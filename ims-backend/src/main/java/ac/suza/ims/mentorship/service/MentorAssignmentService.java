package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.AssignMentorRequest;
import ac.suza.ims.mentorship.dto.MentorAssignmentResponse;

import java.util.List;
import java.util.UUID;

public interface MentorAssignmentService {

    MentorAssignmentResponse assignMentor(AssignMentorRequest request);

    List<MentorAssignmentResponse> getAssignmentsByMentor(UUID mentorId);

    List<MentorAssignmentResponse> getAssignmentsByStartup(UUID startupId);

    MentorAssignmentResponse terminateAssignment(UUID assignmentId);
}

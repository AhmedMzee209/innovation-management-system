package ac.suza.ims.mentorship.service;

import ac.suza.ims.mentorship.dto.CreateMentorRequest;
import ac.suza.ims.mentorship.dto.MentorResponse;
import ac.suza.ims.mentorship.dto.UpdateMentorRequest;

import java.util.List;
import java.util.UUID;

public interface MentorService {

    MentorResponse registerMentor(CreateMentorRequest request);

    MentorResponse getMentorById(UUID id);

    List<MentorResponse> getAllMentors();

    MentorResponse updateMentor(UUID id, UpdateMentorRequest request);

    void deleteMentor(UUID id);
}

package ac.suza.ims.mentorship.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.mentorship.dto.CreateMentorRequest;
import ac.suza.ims.mentorship.dto.MentorResponse;
import ac.suza.ims.mentorship.dto.UpdateMentorRequest;
import ac.suza.ims.mentorship.entity.Mentor;
import ac.suza.ims.mentorship.entity.MentorStatus;
import ac.suza.ims.mentorship.mapper.MentorMapper;
import ac.suza.ims.mentorship.repository.MentorRepository;
import ac.suza.ims.mentorship.service.MentorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorServiceImpl implements MentorService {

    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;
    private final MentorMapper mentorMapper;

    @Override
    @Transactional
    public MentorResponse registerMentor(CreateMentorRequest request) {
        log.info("Registering mentor for user ID: {}", request.getUserId());

        if (mentorRepository.existsByUserId(request.getUserId())) {
            throw new DuplicateResourceException("This user is already registered as a mentor.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Mentor mentor = mentorMapper.toEntity(request);
        mentor.setUser(user);
        mentor.setMentorCode(generateMentorCode());
        mentor.setStatus(MentorStatus.ACTIVE);

        return mentorMapper.toResponse(mentorRepository.save(mentor));
    }

    @Override
    @Transactional(readOnly = true)
    public MentorResponse getMentorById(UUID id) {
        log.info("Fetching mentor by ID: {}", id);
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id: " + id));
        return mentorMapper.toResponse(mentor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MentorResponse> getAllMentors() {
        log.info("Fetching all mentors");
        return mentorRepository.findAll().stream()
                .map(mentorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MentorResponse updateMentor(UUID id, UpdateMentorRequest request) {
        log.info("Updating mentor with ID: {}", id);
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id: " + id));

        mentorMapper.updateEntity(request, mentor);
        return mentorMapper.toResponse(mentorRepository.save(mentor));
    }

    @Override
    @Transactional
    public void deleteMentor(UUID id) {
        log.info("Soft deleting mentor with ID: {}", id);
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id: " + id));
        mentorRepository.delete(mentor);
    }

    private String generateMentorCode() {
        long count = mentorRepository.count() + 1;
        return String.format("MTR-%d-%04d", Year.now().getValue(), count);
    }
}

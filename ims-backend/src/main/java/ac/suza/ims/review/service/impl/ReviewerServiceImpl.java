package ac.suza.ims.review.service.impl;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.review.dto.CreateReviewerRequest;
import ac.suza.ims.review.dto.ReviewerResponse;
import ac.suza.ims.review.entity.Reviewer;
import ac.suza.ims.review.entity.ReviewerStatus;
import ac.suza.ims.review.mapper.ReviewerMapper;
import ac.suza.ims.review.repository.ReviewerRepository;
import ac.suza.ims.review.service.ReviewerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewerServiceImpl implements ReviewerService {

    private final ReviewerRepository reviewerRepository;
    private final UserRepository userRepository;
    private final ReviewerMapper reviewerMapper;

    @Override
    @Transactional
    public ReviewerResponse createReviewer(CreateReviewerRequest request) {
        log.info("Creating reviewer with employee number: {}", request.getEmployeeNumber());

        if (reviewerRepository.existsByEmployeeNumber(request.getEmployeeNumber())) {
            throw new DuplicateResourceException("Reviewer already exists with employee number: " + request.getEmployeeNumber());
        }
        if (reviewerRepository.existsByUserId(request.getUserId())) {
            throw new DuplicateResourceException("A reviewer profile already exists for this user.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Reviewer reviewer = reviewerMapper.toEntity(request);
        reviewer.setUser(user);

        return reviewerMapper.toResponse(reviewerRepository.save(reviewer));
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewerResponse getReviewerById(UUID id) {
        log.info("Fetching reviewer by id: {}", id);
        return reviewerRepository.findById(id)
                .map(reviewerMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewerResponse getReviewerByUserId(UUID userId) {
        log.info("Fetching reviewer by userId: {}", userId);
        return reviewerRepository.findByUserId(userId)
                .map(reviewerMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found for user: " + userId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewerResponse> getAllReviewers() {
        log.info("Fetching all reviewers");
        return reviewerRepository.findAll().stream()
                .map(reviewerMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewerResponse> getActiveReviewers() {
        log.info("Fetching active reviewers");
        return reviewerRepository.findByStatus(ReviewerStatus.ACTIVE).stream()
                .map(reviewerMapper::toResponse)
                .collect(Collectors.toList());
    }
}

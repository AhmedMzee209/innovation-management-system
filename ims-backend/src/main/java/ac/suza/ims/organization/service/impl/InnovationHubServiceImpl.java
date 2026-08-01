package ac.suza.ims.organization.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.organization.dto.InnovationHubRequest;
import ac.suza.ims.organization.dto.InnovationHubResponse;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.mapper.InnovationHubMapper;
import ac.suza.ims.organization.repository.InnovationHubRepository;
import ac.suza.ims.organization.repository.SchoolRepository;
import ac.suza.ims.organization.service.InnovationHubService;
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
public class InnovationHubServiceImpl implements InnovationHubService {

    private final InnovationHubRepository hubRepository;
    private final SchoolRepository schoolRepository;
    private final InnovationHubMapper hubMapper;

    @Override
    @Transactional(readOnly = true)
    public List<InnovationHubResponse> getAllHubs() {
        log.info("Fetching all hubs");
        return hubRepository.findAll().stream()
                .map(hubMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InnovationHubResponse> getHubsBySchool(UUID schoolId) {
        log.info("Fetching hubs for school: {}", schoolId);
        return hubRepository.findBySchoolId(schoolId).stream()
                .map(hubMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public InnovationHubResponse getHubById(UUID id) {
        log.info("Fetching hub by id: {}", id);
        return hubRepository.findById(id)
                .map(hubMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + id));
    }

    @Override
    @Transactional
    public InnovationHubResponse createHub(InnovationHubRequest request) {
        log.info("Creating hub: {}", request.getName());
        if (hubRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("Hub already exists with code: " + request.getCode());
        }
        if (hubRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Hub already exists with name: " + request.getName());
        }
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + request.getSchoolId()));

        InnovationHub hub = hubMapper.toEntity(request);
        hub.setSchool(school);
        return hubMapper.toResponse(hubRepository.save(hub));
    }

    @Override
    @Transactional
    public InnovationHubResponse updateHub(UUID id, InnovationHubRequest request) {
        log.info("Updating hub with id: {}", id);
        InnovationHub hub = hubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + id));

        if (!hub.getCode().equals(request.getCode()) && hubRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("Hub already exists with code: " + request.getCode());
        }
        if (!hub.getName().equals(request.getName()) && hubRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Hub already exists with name: " + request.getName());
        }
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + request.getSchoolId()));

        hubMapper.updateEntity(request, hub);
        hub.setSchool(school);
        return hubMapper.toResponse(hubRepository.save(hub));
    }

    @Override
    @Transactional
    public void deleteHub(UUID id) {
        log.info("Deleting hub with id: {}", id);
        InnovationHub hub = hubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hub not found with id: " + id));
        hubRepository.delete(hub);
    }
}

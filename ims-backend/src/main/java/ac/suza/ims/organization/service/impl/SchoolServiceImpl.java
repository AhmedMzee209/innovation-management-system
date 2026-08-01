package ac.suza.ims.organization.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.organization.dto.SchoolRequest;
import ac.suza.ims.organization.dto.SchoolResponse;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.mapper.SchoolMapper;
import ac.suza.ims.organization.repository.SchoolRepository;
import ac.suza.ims.organization.service.SchoolService;
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
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolMapper schoolMapper;

    @Override
    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllSchools() {
        log.info("Fetching all schools");
        return schoolRepository.findAll().stream()
                .map(schoolMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SchoolResponse getSchoolById(UUID id) {
        log.info("Fetching school by id: {}", id);
        return schoolRepository.findById(id)
                .map(schoolMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
    }

    @Override
    @Transactional
    public SchoolResponse createSchool(SchoolRequest request) {
        log.info("Creating school: {}", request.getName());
        if (schoolRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("School already exists with code: " + request.getCode());
        }
        if (schoolRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("School already exists with name: " + request.getName());
        }
        if (schoolRepository.existsByShortName(request.getShortName())) {
            throw new DuplicateResourceException("School already exists with short name: " + request.getShortName());
        }
        School school = schoolMapper.toEntity(request);
        return schoolMapper.toResponse(schoolRepository.save(school));
    }

    @Override
    @Transactional
    public SchoolResponse updateSchool(UUID id, SchoolRequest request) {
        log.info("Updating school with id: {}", id);
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        if (!school.getCode().equals(request.getCode()) && schoolRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("School already exists with code: " + request.getCode());
        }
        if (!school.getName().equals(request.getName()) && schoolRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("School already exists with name: " + request.getName());
        }
        schoolMapper.updateEntity(request, school);
        return schoolMapper.toResponse(schoolRepository.save(school));
    }

    @Override
    @Transactional
    public void deleteSchool(UUID id) {
        log.info("Deleting school with id: {}", id);
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
        schoolRepository.delete(school);
    }
}

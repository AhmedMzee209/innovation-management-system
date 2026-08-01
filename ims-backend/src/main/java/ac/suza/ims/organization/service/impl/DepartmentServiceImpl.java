package ac.suza.ims.organization.service.impl;

import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import ac.suza.ims.organization.dto.DepartmentRequest;
import ac.suza.ims.organization.dto.DepartmentResponse;
import ac.suza.ims.organization.entity.Department;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.mapper.DepartmentMapper;
import ac.suza.ims.organization.repository.DepartmentRepository;
import ac.suza.ims.organization.repository.SchoolRepository;
import ac.suza.ims.organization.service.DepartmentService;
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
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final SchoolRepository schoolRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getAllDepartments() {
        log.info("Fetching all departments");
        return departmentRepository.findAll().stream()
                .map(departmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getDepartmentsBySchool(UUID schoolId) {
        log.info("Fetching departments for school: {}", schoolId);
        return departmentRepository.findBySchoolId(schoolId).stream()
                .map(departmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartmentById(UUID id) {
        log.info("Fetching department by id: {}", id);
        return departmentRepository.findById(id)
                .map(departmentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    @Override
    @Transactional
    public DepartmentResponse createDepartment(DepartmentRequest request) {
        log.info("Creating department with code: {}", request.getCode());
        
        if (departmentRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("Department already exists with code: " + request.getCode());
        }
        
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + request.getSchoolId()));

        Department department = departmentMapper.toEntity(request);
        department.setSchool(school);
        
        return departmentMapper.toResponse(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public DepartmentResponse updateDepartment(UUID id, DepartmentRequest request) {
        log.info("Updating department with id: {}", id);
        
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        if (!department.getCode().equals(request.getCode()) && departmentRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("Department already exists with code: " + request.getCode());
        }
        
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + request.getSchoolId()));

        departmentMapper.updateEntity(request, department);
        department.setSchool(school);
        
        return departmentMapper.toResponse(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public void deleteDepartment(UUID id) {
        log.info("Deleting department with id: {}", id);
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        departmentRepository.delete(department);
    }
}

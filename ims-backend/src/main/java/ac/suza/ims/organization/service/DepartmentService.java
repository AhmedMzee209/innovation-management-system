package ac.suza.ims.organization.service;

import ac.suza.ims.organization.dto.DepartmentRequest;
import ac.suza.ims.organization.dto.DepartmentResponse;

import java.util.List;
import java.util.UUID;

public interface DepartmentService {
    List<DepartmentResponse> getAllDepartments();
    List<DepartmentResponse> getDepartmentsBySchool(UUID schoolId);
    DepartmentResponse getDepartmentById(UUID id);
    DepartmentResponse createDepartment(DepartmentRequest request);
    DepartmentResponse updateDepartment(UUID id, DepartmentRequest request);
    void deleteDepartment(UUID id);
}

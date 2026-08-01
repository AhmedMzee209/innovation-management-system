package ac.suza.ims.organization.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.organization.dto.DepartmentRequest;
import ac.suza.ims.organization.dto.DepartmentResponse;
import ac.suza.ims.organization.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Tag(name = "Departments", description = "Department Management APIs")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Operation(summary = "Get all departments")
    @GetMapping
    public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getAllDepartments() {
        return ResponseEntity.ok(ApiResponse.success("Departments fetched successfully", departmentService.getAllDepartments()));
    }

    @Operation(summary = "Get departments by school")
    @GetMapping("/school/{schoolId}")
    public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getDepartmentsBySchool(@PathVariable UUID schoolId) {
        return ResponseEntity.ok(ApiResponse.success("Departments fetched successfully", departmentService.getDepartmentsBySchool(schoolId)));
    }

    @Operation(summary = "Get department by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Department fetched successfully", departmentService.getDepartmentById(id)));
    }

    @Operation(summary = "Create a new department")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<DepartmentResponse>> createDepartment(@Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Department created successfully", departmentService.createDepartment(request)));
    }

    @Operation(summary = "Update a department")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> updateDepartment(
            @PathVariable UUID id, @Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Department updated successfully", departmentService.updateDepartment(id, request)));
    }

    @Operation(summary = "Delete a department")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDepartment(@PathVariable UUID id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok(ApiResponse.noContent("Department deleted successfully"));
    }
}

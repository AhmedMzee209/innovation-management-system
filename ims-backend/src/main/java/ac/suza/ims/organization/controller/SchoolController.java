package ac.suza.ims.organization.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.organization.dto.SchoolRequest;
import ac.suza.ims.organization.dto.SchoolResponse;
import ac.suza.ims.organization.service.SchoolService;
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
@RequestMapping("/api/schools")
@RequiredArgsConstructor
@Tag(name = "Schools", description = "School Management APIs")
public class SchoolController {

    private final SchoolService schoolService;

    @Operation(summary = "Get all schools")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SchoolResponse>>> getAllSchools() {
        return ResponseEntity.ok(ApiResponse.success("Schools fetched successfully", schoolService.getAllSchools()));
    }

    @Operation(summary = "Get school by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SchoolResponse>> getSchoolById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("School fetched successfully", schoolService.getSchoolById(id)));
    }

    @Operation(summary = "Create a new school")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<SchoolResponse>> createSchool(@Valid @RequestBody SchoolRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("School created successfully", schoolService.createSchool(request)));
    }

    @Operation(summary = "Update a school")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SchoolResponse>> updateSchool(
            @PathVariable UUID id, @Valid @RequestBody SchoolRequest request) {
        return ResponseEntity.ok(ApiResponse.success("School updated successfully", schoolService.updateSchool(id, request)));
    }

    @Operation(summary = "Delete a school")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('ORGANIZATION_MANAGE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchool(@PathVariable UUID id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.ok(ApiResponse.noContent("School deleted successfully"));
    }
}

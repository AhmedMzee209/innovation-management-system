package ac.suza.ims.innovation.controller;

import ac.suza.ims.common.response.ApiResponse;
import ac.suza.ims.innovation.dto.InnovationCategoryRequest;
import ac.suza.ims.innovation.dto.InnovationCategoryResponse;
import ac.suza.ims.innovation.service.InnovationCategoryService;
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
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Innovation Categories", description = "Innovation Category Management APIs")
public class InnovationCategoryController {

    private final InnovationCategoryService categoryService;

    @Operation(summary = "Get all categories")
    @GetMapping
    public ResponseEntity<ApiResponse<List<InnovationCategoryResponse>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.success("Categories fetched successfully", categoryService.getAllCategories()));
    }

    @Operation(summary = "Get category by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InnovationCategoryResponse>> getCategoryById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Category fetched successfully", categoryService.getCategoryById(id)));
    }

    @Operation(summary = "Create a new category")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('INNOVATION_MANAGE')")
    @PostMapping
    public ResponseEntity<ApiResponse<InnovationCategoryResponse>> createCategory(@Valid @RequestBody InnovationCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Category created successfully", categoryService.createCategory(request)));
    }
}

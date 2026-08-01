package ac.suza.ims.auth.controller;

import ac.suza.ims.auth.dto.UserRequest;
import ac.suza.ims.auth.dto.UserResponse;
import ac.suza.ims.auth.service.UserService;
import ac.suza.ims.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User Management APIs")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get all users")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('USER_VIEW')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(
                "Users fetched successfully",
                userService.getAllUsers()
        ));
    }

    @Operation(summary = "Get user by ID")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('USER_VIEW')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(
                "User fetched successfully",
                userService.getUserById(id)
        ));
    }

    @Operation(summary = "Update user")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('USER_UPDATE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UserRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                "User updated successfully",
                userService.updateUser(id, request)
        ));
    }

    @Operation(summary = "Delete user")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN') or hasAuthority('USER_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.noContent("User deleted successfully"));
    }
}

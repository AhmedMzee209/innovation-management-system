package ac.suza.ims.auth.service;

import ac.suza.ims.auth.dto.UserRequest;
import ac.suza.ims.auth.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;

public interface UserService {
    Page<UserResponse> getAllUsers(String search, UUID roleId, Boolean enabled, Pageable pageable);
    UserResponse getUserById(UUID id);
    UserResponse updateUser(UUID id, UserRequest request);
    void deleteUser(UUID id);
}

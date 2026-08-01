package ac.suza.ims.auth.service;

import ac.suza.ims.auth.dto.UserRequest;
import ac.suza.ims.auth.dto.UserResponse;
import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(UUID id);
    UserResponse updateUser(UUID id, UserRequest request);
    void deleteUser(UUID id);
}

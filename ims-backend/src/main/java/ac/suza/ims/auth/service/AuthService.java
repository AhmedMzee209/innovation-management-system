package ac.suza.ims.auth.service;

import ac.suza.ims.auth.dto.*;

public interface AuthService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse login(LoginRequest request);
    RefreshTokenResponse refresh(RefreshTokenRequest request);
    UserResponse getMe();
    UserResponse updateMe(UserRequest request);
    void logout();
}

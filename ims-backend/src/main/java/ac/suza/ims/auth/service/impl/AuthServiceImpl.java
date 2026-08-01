package ac.suza.ims.auth.service.impl;

import ac.suza.ims.auth.dto.*;
import ac.suza.ims.auth.entity.Role;
import ac.suza.ims.auth.entity.RoleType;
import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.mapper.UserMapper;
import ac.suza.ims.auth.repository.RoleRepository;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.auth.service.AuthService;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.UnauthorizedException;
import ac.suza.ims.security.jwt.JwtTokenProvider;
import ac.suza.ims.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already in use: " + request.getEmail());
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already in use: " + request.getUsername());
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Assign default STUDENT role
        Role defaultRole = roleRepository.findByName(RoleType.STUDENT)
                .orElseThrow(() -> new BusinessException("Default role not found. Please contact administrator."));
        
        user.addRole(defaultRole);

        User savedUser = userRepository.save(user);

        CustomUserDetails userDetails = buildUserDetails(savedUser);
        String accessToken = jwtTokenProvider.createAccessToken(userDetails);
        String refreshToken = jwtTokenProvider.createRefreshToken(userDetails);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.toResponse(savedUser))
                .build();
    }

    @Override
    @Transactional
    public AuthenticationResponse login(LoginRequest request) {
        log.info("Authenticating user: {}", request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
                
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = jwtTokenProvider.createAccessToken(userDetails);
        String refreshToken = jwtTokenProvider.createRefreshToken(userDetails);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    public RefreshTokenResponse refresh(RefreshTokenRequest request) {
        log.info("Refreshing token");
        
        String refreshToken = request.getRefreshToken();
        
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String username = jwtTokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        if (!user.isEnabled()) {
            throw new UnauthorizedException("User account is disabled");
        }

        CustomUserDetails userDetails = buildUserDetails(user);
        String newAccessToken = jwtTokenProvider.createAccessToken(userDetails);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(userDetails);

        return RefreshTokenResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Not authenticated");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        return userMapper.toResponse(user);
    }

    @Override
    public void logout() {
        log.info("Logging out user");
        // In a stateless JWT implementation, logout is usually handled client-side by deleting the token.
        // For enhanced security, we could implement a token blocklist here, but for now we just clear the context.
        SecurityContextHolder.clearContext();
    }

    private CustomUserDetails buildUserDetails(User user) {
        return CustomUserDetails.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .active(user.isEnabled())
                .roles(user.getRoles().stream()
                        .map(r -> r.getName().name())
                        .collect(java.util.stream.Collectors.toSet()))
                .build();
    }
}

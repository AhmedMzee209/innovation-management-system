package ac.suza.ims.security.service;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Spring Security UserDetailsService implementation.
 * Loads a user by email address from the database and wraps it in
 * {@link CustomUserDetails} for the security context.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Loading user by email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Set<String> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add("ROLE_" + role.getName().name());
            role.getPermissions().forEach(permission -> {
                authorities.add(permission.getName());
            });
        });

        return CustomUserDetails.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .active(user.isEnabled())
                .roles(authorities)
                .build();
    }
}


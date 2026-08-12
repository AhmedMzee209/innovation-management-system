package ac.suza.ims.auth.service.impl;

import ac.suza.ims.auth.dto.UserRequest;
import ac.suza.ims.auth.dto.UserResponse;
import ac.suza.ims.auth.entity.Role;
import ac.suza.ims.auth.entity.User;
import ac.suza.ims.auth.mapper.UserMapper;
import ac.suza.ims.auth.repository.RoleRepository;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.auth.service.UserService;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Join;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> getAllUsers(String search, UUID roleId, Boolean enabled, Pageable pageable) {
        log.info("Fetching all users with pagination and filters");

        Specification<User> spec = (root, query, cb) -> {
            var predicates = cb.conjunction();

            if (StringUtils.hasText(search)) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                predicates = cb.and(predicates, cb.or(
                        cb.like(cb.lower(root.get("firstName")), searchPattern),
                        cb.like(cb.lower(root.get("lastName")), searchPattern),
                        cb.like(cb.lower(root.get("email")), searchPattern)
                ));
            }

            if (roleId != null) {
                Join<User, Role> rolesJoin = root.join("roles");
                predicates = cb.and(predicates, cb.equal(rolesJoin.get("id"), roleId));
            }

            if (enabled != null) {
                predicates = cb.and(predicates, cb.equal(root.get("enabled"), enabled));
            }

            return predicates;
        };

        return userRepository.findAll(spec, pageable).map(userMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(UUID id) {
        log.info("Fetching user by id: {}", id);
        return userRepository.findById(id)
                .map(userMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    @Transactional
    public UserResponse updateUser(UUID id, UserRequest request) {
        log.info("Updating user with id: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Check unique constraints if email or username changed
        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already in use: " + request.getEmail());
        }

        user.setFirstName(request.getFirstName());
        user.setMiddleName(request.getMiddleName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setProfilePhoto(request.getProfilePhoto());

        if (request.getEnabled() != null) {
            user.setEnabled(request.getEnabled());
        }

        // Update roles if provided
        if (request.getRoleIds() != null) {
            Set<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoleIds()));
            if (roles.size() != request.getRoleIds().size()) {
                throw new ResourceNotFoundException("One or more roles not found.");
            }
            user.setRoles(roles);
        }

        User updatedUser = userRepository.save(user);
        return userMapper.toResponse(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        log.info("Deleting user with id: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }
}

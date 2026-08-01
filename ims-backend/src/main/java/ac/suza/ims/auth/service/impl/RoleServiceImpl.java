package ac.suza.ims.auth.service.impl;

import ac.suza.ims.auth.dto.RoleRequest;
import ac.suza.ims.auth.dto.RoleResponse;
import ac.suza.ims.auth.entity.Permission;
import ac.suza.ims.auth.entity.Role;
import ac.suza.ims.auth.mapper.RoleMapper;
import ac.suza.ims.auth.repository.PermissionRepository;
import ac.suza.ims.auth.repository.RoleRepository;
import ac.suza.ims.auth.service.RoleService;
import ac.suza.ims.exception.BusinessException;
import ac.suza.ims.exception.DuplicateResourceException;
import ac.suza.ims.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RoleMapper roleMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getAllRoles() {
        log.info("Fetching all roles");
        return roleRepository.findAll().stream()
                .map(roleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RoleResponse getRoleById(UUID id) {
        log.info("Fetching role by id: {}", id);
        return roleRepository.findById(id)
                .map(roleMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
    }

    @Override
    @Transactional
    public RoleResponse createRole(RoleRequest request) {
        log.info("Creating new role: {}", request.getName());

        if (roleRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Role already exists with name: " + request.getName());
        }

        Role role = Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .systemRole(false) // Custom roles are never system roles
                .permissions(fetchPermissions(request.getPermissionIds()))
                .build();

        Role savedRole = roleRepository.save(role);
        return roleMapper.toResponse(savedRole);
    }

    @Override
    @Transactional
    public RoleResponse updateRole(UUID id, RoleRequest request) {
        log.info("Updating role with id: {}", id);

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));

        // Prevent modifying system roles
        if (role.isSystemRole()) {
            throw new BusinessException("Cannot modify a system-defined role.");
        }

        if (!role.getName().equals(request.getName()) && roleRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Role already exists with name: " + request.getName());
        }

        role.setName(request.getName());
        role.setDescription(request.getDescription());
        role.setPermissions(fetchPermissions(request.getPermissionIds()));

        Role updatedRole = roleRepository.save(role);
        return roleMapper.toResponse(updatedRole);
    }

    @Override
    @Transactional
    public void deleteRole(UUID id) {
        log.info("Deleting role with id: {}", id);

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));

        // Prevent deleting system roles
        if (role.isSystemRole()) {
            throw new BusinessException("Cannot delete a system-defined role.");
        }

        roleRepository.delete(role);
    }

    private Set<Permission> fetchPermissions(Set<UUID> permissionIds) {
        Set<Permission> permissions = new HashSet<>();
        if (permissionIds != null && !permissionIds.isEmpty()) {
            permissions.addAll(permissionRepository.findAllById(permissionIds));
            if (permissions.size() != permissionIds.size()) {
                throw new ResourceNotFoundException("One or more permissions not found.");
            }
        }
        return permissions;
    }
}

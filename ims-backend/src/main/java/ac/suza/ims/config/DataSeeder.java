package ac.suza.ims.config;

import ac.suza.ims.auth.entity.*;
import ac.suza.ims.auth.repository.PermissionRepository;
import ac.suza.ims.auth.repository.RoleRepository;
import ac.suza.ims.auth.repository.UserRepository;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import ac.suza.ims.organization.repository.InnovationHubRepository;
import ac.suza.ims.organization.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SchoolRepository schoolRepository;
    private final InnovationHubRepository innovationHubRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Starting Data Seeding Process...");

        seedPermissions();
        seedRoles();
        assignPermissionsToSuperAdmin();
        createSuperAdminAccount();
        seedOrganization();

        log.info("Data Seeding Process Completed.");
    }

    private void seedPermissions() {
        log.info("Seeding permissions...");
        
        List<Permission> defaultPermissions = Arrays.asList(
                createPermission("USER_VIEW", "View user details", ModuleType.USER_MANAGEMENT),
                createPermission("USER_CREATE", "Create new users", ModuleType.USER_MANAGEMENT),
                createPermission("USER_UPDATE", "Update existing users", ModuleType.USER_MANAGEMENT),
                createPermission("USER_DELETE", "Delete users", ModuleType.USER_MANAGEMENT),

                createPermission("ROLE_MANAGE", "Manage roles and assignments", ModuleType.ROLE_MANAGEMENT),
                createPermission("PERMISSION_MANAGE", "Manage system permissions", ModuleType.ROLE_MANAGEMENT),

                createPermission("ORGANIZATION_MANAGE", "Manage university hubs and schools", ModuleType.ORGANIZATION_MANAGEMENT),
                
                createPermission("INNOVATION_CREATE", "Create new innovation submissions", ModuleType.INNOVATION_MANAGEMENT),
                createPermission("INNOVATION_REVIEW", "Review submitted innovations", ModuleType.INNOVATION_MANAGEMENT),
                createPermission("INNOVATION_APPROVE", "Approve or reject innovations", ModuleType.INNOVATION_MANAGEMENT),

                createPermission("STARTUP_CREATE", "Register new startups", ModuleType.STARTUP_MANAGEMENT),
                
                createPermission("FUNDING_MANAGE", "Manage funding opportunities and allocations", ModuleType.FUNDING_MANAGEMENT),
                
                createPermission("COMPETITION_MANAGE", "Manage innovation competitions", ModuleType.COMPETITION_MANAGEMENT),
                
                createPermission("REPORT_VIEW", "View system reports and analytics", ModuleType.REPORT_MANAGEMENT),
                
                createPermission("SYSTEM_SETTINGS", "Manage global system configurations", ModuleType.SYSTEM_SETTINGS)
        );

        for (Permission permission : defaultPermissions) {
            if (!permissionRepository.existsByName(permission.getName())) {
                permissionRepository.save(permission);
            }
        }
    }

    private Permission createPermission(String name, String description, ModuleType module) {
        return Permission.builder()
                .name(name)
                .description(description)
                .module(module)
                .build();
    }

    private void seedRoles() {
        log.info("Seeding system roles...");
        
        for (RoleType roleType : RoleType.values()) {
            if (!roleRepository.existsByName(roleType)) {
                Role role = Role.builder()
                        .name(roleType)
                        .description("System defined role: " + roleType.name())
                        .systemRole(true)
                        .build();
                roleRepository.save(role);
            }
        }
    }

    private void assignPermissionsToSuperAdmin() {
        log.info("Assigning all permissions to SUPER_ADMIN role...");
        
        Role superAdminRole = roleRepository.findByName(RoleType.SUPER_ADMIN)
                .orElseThrow(() -> new IllegalStateException("SUPER_ADMIN role not found!"));

        Set<Permission> allPermissions = new HashSet<>(permissionRepository.findAll());
        superAdminRole.setPermissions(allPermissions);
        
        roleRepository.save(superAdminRole);
    }

    private void createSuperAdminAccount() {
        String adminEmail = "admin@suza.ac.tz";
        
        if (!userRepository.existsByEmail(adminEmail)) {
            log.info("Creating default Super Admin account...");
            
            Role superAdminRole = roleRepository.findByName(RoleType.SUPER_ADMIN)
                    .orElseThrow(() -> new IllegalStateException("SUPER_ADMIN role not found!"));

            User admin = User.builder()
                    .firstName("System")
                    .lastName("Administrator")
                    .username("superadmin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("Admin@123"))
                    .enabled(true)
                    .emailVerified(true)
                    .build();

            admin.addRole(superAdminRole);
            userRepository.save(admin);
            
            log.info("Default Super Admin account created: {}", adminEmail);
        } else {
            log.info("Super Admin account already exists.");
        }
    }

    private void seedOrganization() {
        log.info("Seeding default schools and hubs...");

        String[][] schoolData = {
                {"School of Computing and Communication Sciences", "SCCMS"},
                {"School of Education", "SE"},
                {"School of Arts and Social Sciences", "SASS"},
                {"School of Natural Resources", "SNR"},
                {"School of Health and Allied Sciences", "SHAS"}
        };

        for (String[] sd : schoolData) {
            String name = sd[0], shortName = sd[1];
            if (!schoolRepository.existsByName(name)) {
                School school = School.builder()
                        .code(shortName)
                        .name(name)
                        .shortName(shortName)
                        .description("School of " + shortName + " at SUZA")
                        .build();
                School saved = schoolRepository.save(school);

                // Create one default Innovation Hub per school
                String hubName = shortName + " Innovation Hub";
                if (!innovationHubRepository.existsByName(hubName)) {
                    InnovationHub hub = InnovationHub.builder()
                            .code(shortName + "-HUB")
                            .name(hubName)
                            .description("Primary innovation centre for " + name)
                            .officeLocation("Main Campus, Zanzibar")
                            .school(saved)
                            .build();
                    innovationHubRepository.save(hub);
                }
            }
        }
    }
}

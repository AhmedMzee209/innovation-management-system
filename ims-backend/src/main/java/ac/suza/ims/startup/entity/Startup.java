package ac.suza.ims.startup.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.innovation.entity.Innovation;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "startups",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_startup_code", columnNames = "startup_code"),
                @UniqueConstraint(name = "uk_startup_innovation", columnNames = "innovation_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE startups SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Startup extends BaseEntity {

    @NotBlank(message = "Startup code is mandatory")
    @Size(max = 50)
    @Column(name = "startup_code", nullable = false, unique = true, length = 50)
    private String startupCode;

    @NotBlank(message = "Startup name is mandatory")
    @Size(max = 255)
    @Column(name = "startup_name", nullable = false, length = 255)
    private String startupName;

    @Size(max = 255)
    @Column(length = 255)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String vision;

    @Column(columnDefinition = "TEXT")
    private String mission;

    @Size(max = 500)
    @Column(length = 500)
    private String logo;

    @Size(max = 255)
    @Column(length = 255)
    private String website;

    @Size(max = 100)
    @Column(name = "registration_number", length = 100)
    private String registrationNumber;

    @Column(name = "founded_date")
    private LocalDate foundedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private StartupStatus status = StartupStatus.ACTIVE;

    // Relationships
    @NotNull(message = "Innovation is mandatory")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "innovation_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_startup_innovation"))
    private Innovation innovation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hub_id", foreignKey = @ForeignKey(name = "fk_startup_hub"))
    private InnovationHub hub;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id", foreignKey = @ForeignKey(name = "fk_startup_school"))
    private School school;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id", foreignKey = @ForeignKey(name = "fk_startup_manager"))
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_stage_id", foreignKey = @ForeignKey(name = "fk_startup_stage"))
    private StartupStage currentStage;
}

package ac.suza.ims.competition.entity;

import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.startup.entity.Startup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(
        name = "competition_registrations",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_registration_number", columnNames = "registration_number")
        },
        indexes = {
                @Index(name = "idx_comp_reg_comp_startup", columnList = "competition_id, startup_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE competition_registrations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class CompetitionRegistration extends BaseEntity {

    @NotBlank(message = "Registration number is mandatory")
    @Size(max = 50)
    @Column(name = "registration_number", nullable = false, unique = true, length = 50)
    private String registrationNumber;

    @NotNull(message = "Registration date is mandatory")
    @Column(name = "registration_date", nullable = false)
    @Builder.Default
    private LocalDate registrationDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private RegistrationStatus status = RegistrationStatus.REGISTERED;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Relationships
    @NotNull(message = "Competition is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "competition_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_reg_competition"))
    private Competition competition;

    @NotNull(message = "Startup is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "startup_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_comp_reg_startup"))
    private Startup startup;
}

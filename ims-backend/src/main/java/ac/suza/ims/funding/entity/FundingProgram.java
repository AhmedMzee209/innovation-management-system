package ac.suza.ims.funding.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(
        name = "funding_programs",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_funding_program_code", columnNames = "program_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE funding_programs SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FundingProgram extends BaseEntity {

    @NotBlank(message = "Program code is mandatory")
    @Size(max = 50)
    @Column(name = "program_code", nullable = false, unique = true, length = 50)
    private String programCode;

    @NotBlank(message = "Program name is mandatory")
    @Size(max = 255)
    @Column(name = "program_name", nullable = false, length = 255)
    private String programName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Size(max = 255)
    @Column(length = 255)
    private String sponsor;

    @Enumerated(EnumType.STRING)
    @Column(name = "funding_type", nullable = false, length = 50)
    @Builder.Default
    private FundingType fundingType = FundingType.GRANT;

    @Column(name = "maximum_amount", precision = 15, scale = 2)
    private BigDecimal maximumAmount;

    @Column(name = "minimum_amount", precision = 15, scale = 2)
    private BigDecimal minimumAmount;

    @Column(name = "application_open_date")
    private LocalDate applicationOpenDate;

    @Column(name = "application_close_date")
    private LocalDate applicationCloseDate;

    @Column(name = "announcement_date")
    private LocalDate announcementDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private FundingProgramStatus status = FundingProgramStatus.DRAFT;
}

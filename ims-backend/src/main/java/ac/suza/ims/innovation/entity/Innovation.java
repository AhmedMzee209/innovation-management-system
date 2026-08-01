package ac.suza.ims.innovation.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import ac.suza.ims.organization.entity.Department;
import ac.suza.ims.organization.entity.InnovationHub;
import ac.suza.ims.organization.entity.School;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "innovations",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_innovation_code", columnNames = "innovation_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Innovation extends BaseEntity {

    @NotBlank(message = "Innovation code is mandatory")
    @Size(max = 50)
    @Column(name = "innovation_code", nullable = false, unique = true, length = 50)
    private String innovationCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "abstract_text", columnDefinition = "TEXT")
    private String abstractText;

    @NotBlank(message = "Problem statement is mandatory")
    @Column(name = "problem_statement", nullable = false, columnDefinition = "TEXT")
    private String problemStatement;

    @NotBlank(message = "Proposed solution is mandatory")
    @Column(name = "proposed_solution", nullable = false, columnDefinition = "TEXT")
    private String proposedSolution;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    @Column(name = "expected_impact", columnDefinition = "TEXT")
    private String expectedImpact;

    @Column(name = "target_beneficiaries", columnDefinition = "TEXT")
    private String targetBeneficiaries;

    @Enumerated(EnumType.STRING)
    @Column(name = "innovation_level", length = 50)
    private InnovationLevel innovationLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "innovation_type", length = 50)
    private InnovationType innovationType;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", nullable = false, length = 50)
    @Builder.Default
    private InnovationStatus currentStatus = InnovationStatus.DRAFT;

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // Relationships
    @NotNull(message = "Owner is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_owner"))
    private User owner;

    @NotNull(message = "School is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_school"))
    private School school;

    @NotNull(message = "Department is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_department"))
    private Department department;

    @NotNull(message = "Hub is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hub_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_hub"))
    private InnovationHub hub;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id", foreignKey = @ForeignKey(name = "fk_innovation_manager"))
    private User manager;

    @NotNull(message = "Category is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_innovation_category"))
    private InnovationCategory category;

    @OneToMany(mappedBy = "innovation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<InnovationDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "innovation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<InnovationStatusHistory> statusHistory = new ArrayList<>();
}

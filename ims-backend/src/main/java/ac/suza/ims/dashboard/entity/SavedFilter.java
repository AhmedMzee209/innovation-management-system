package ac.suza.ims.dashboard.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "saved_filters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE saved_filters SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class SavedFilter extends BaseEntity {

    @NotBlank(message = "Filter name is mandatory")
    @Size(max = 150)
    @Column(name = "filter_name", nullable = false, length = 150)
    private String filterName;

    @NotBlank(message = "Module is mandatory")
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String module;

    @NotBlank(message = "Filter definition is mandatory")
    @Column(name = "filter_definition", columnDefinition = "TEXT", nullable = false)
    private String filterDefinition;

    @Column(name = "created_date", nullable = false)
    @Builder.Default
    private LocalDate createdDate = LocalDate.now();

    // Relationships
    @NotNull(message = "User is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_saved_filter_user"))
    private User user;
}

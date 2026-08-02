package ac.suza.ims.dashboard.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dashboard_layouts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE dashboard_layouts SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DashboardLayout extends BaseEntity {

    @NotBlank(message = "Layout name is mandatory")
    @Size(max = 150)
    @Column(name = "layout_name", nullable = false, length = 150)
    private String layoutName;

    @NotNull(message = "User role is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false, length = 50)
    private DashboardRole userRole;

    @Column(name = "is_default", nullable = false)
    @Builder.Default
    private Boolean isDefault = true;

    @Size(max = 255)
    @Column(length = 255)
    private String description;

    @OneToMany(mappedBy = "layout", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DashboardWidget> widgets = new ArrayList<>();
}

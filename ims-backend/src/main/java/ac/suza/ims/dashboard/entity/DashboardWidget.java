package ac.suza.ims.dashboard.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "dashboard_widgets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE dashboard_widgets SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DashboardWidget extends BaseEntity {

    @NotBlank(message = "Widget code is mandatory")
    @Size(max = 50)
    @Column(name = "widget_code", nullable = false, unique = true, length = 50)
    private String widgetCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String title;

    @NotNull(message = "Widget type is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "widget_type", nullable = false, length = 50)
    private WidgetType widgetType;

    @Enumerated(EnumType.STRING)
    @Column(name = "chart_type", length = 50)
    private ChartType chartType;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 1;

    @Column(nullable = false)
    @Builder.Default
    private Integer width = 6;

    @Column(nullable = false)
    @Builder.Default
    private Integer height = 4;

    @Column(name = "refresh_interval", nullable = false)
    @Builder.Default
    private Integer refreshInterval = 60;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    // Relationships
    @NotNull(message = "Dashboard layout is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "layout_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_widget_layout"))
    private DashboardLayout layout;
}

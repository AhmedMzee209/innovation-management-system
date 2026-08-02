package ac.suza.ims.startup.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(
        name = "startup_stages",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_startup_stage_name", columnNames = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE startup_stages SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class StartupStage extends BaseEntity {

    @NotBlank(message = "Stage name is mandatory")
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;
}

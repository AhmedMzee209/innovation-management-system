package ac.suza.ims.notification.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "notification_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE notification_templates SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class NotificationTemplate extends BaseEntity {

    @NotBlank(message = "Template code is mandatory")
    @Size(max = 50)
    @Column(name = "template_code", nullable = false, unique = true, length = 50)
    private String templateCode;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String name;

    @NotBlank(message = "Subject is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String subject;

    @NotBlank(message = "Body is mandatory")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @NotNull(message = "Notification type is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false, length = 50)
    private NotificationType notificationType;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
}

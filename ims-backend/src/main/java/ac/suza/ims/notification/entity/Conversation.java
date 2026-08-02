package ac.suza.ims.notification.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "conversations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE conversations SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Conversation extends BaseEntity {

    @NotBlank(message = "Conversation code is mandatory")
    @Size(max = 50)
    @Column(name = "conversation_code", nullable = false, unique = true, length = 50)
    private String conversationCode;

    @Size(max = 255)
    @Column(length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "conversation_type", nullable = false, length = 50)
    @Builder.Default
    private ConversationType conversationType = ConversationType.DIRECT;

    @Column(name = "created_date", nullable = false)
    @Builder.Default
    private LocalDate createdDate = LocalDate.now();

    @Size(max = 50)
    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";
}

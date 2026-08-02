package ac.suza.ims.notification.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversation_participants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE conversation_participants SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class ConversationParticipant extends BaseEntity {

    @Column(name = "joined_date", nullable = false)
    @Builder.Default
    private LocalDate joinedDate = LocalDate.now();

    @Column(name = "last_read_at")
    private LocalDateTime lastReadAt;

    @Size(max = 50)
    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    // Relationships
    @NotNull(message = "User is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_conv_participant_user"))
    private User user;

    @NotNull(message = "Conversation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_conv_participant_conversation"))
    private Conversation conversation;
}

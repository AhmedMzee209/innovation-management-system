package ac.suza.ims.document.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "document_access_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE document_access_records SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DocumentAccess extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "access_type", nullable = false, length = 50)
    private AccessType accessType;

    @Column(name = "granted_date", nullable = false)
    @Builder.Default
    private LocalDate grantedDate = LocalDate.now();

    @Column(name = "expires_at")
    private LocalDate expiresAt;

    // Relationships
    @NotNull(message = "Document is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "document_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_doc_access_document"))
    private Document document;

    @NotNull(message = "User is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_doc_access_user"))
    private User user;
}

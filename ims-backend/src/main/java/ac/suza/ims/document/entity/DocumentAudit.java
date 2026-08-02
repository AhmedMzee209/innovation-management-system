package ac.suza.ims.document.entity;

import ac.suza.ims.auth.entity.User;
import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "document_audits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE document_audits SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DocumentAudit extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private DocumentAction action;

    @Column(name = "performed_date", nullable = false)
    @Builder.Default
    private LocalDate performedDate = LocalDate.now();

    @Size(max = 45)
    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Size(max = 255)
    @Column(length = 255)
    private String device;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by", foreignKey = @ForeignKey(name = "fk_doc_audit_user"))
    private User performedBy;

    @NotNull(message = "Document is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "document_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_doc_audit_document"))
    private Document document;
}

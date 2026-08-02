package ac.suza.ims.opportunity.entity;

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
@Table(name = "opportunity_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE opportunity_documents SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class OpportunityDocument extends BaseEntity {

    @NotBlank(message = "Document name is mandatory")
    @Size(max = 255)
    @Column(name = "document_name", nullable = false, length = 255)
    private String documentName;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false, length = 50)
    @Builder.Default
    private DocumentType documentType = DocumentType.OTHER;

    @NotBlank(message = "Storage path is mandatory")
    @Size(max = 500)
    @Column(name = "storage_path", nullable = false, length = 500)
    private String storagePath;

    @NotNull(message = "Upload date is mandatory")
    @Column(name = "upload_date", nullable = false)
    @Builder.Default
    private LocalDate uploadDate = LocalDate.now();

    // Relationships
    @NotNull(message = "Application is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_opp_doc_application"))
    private OpportunityApplication application;
}

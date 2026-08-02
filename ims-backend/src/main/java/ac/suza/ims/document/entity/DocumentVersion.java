package ac.suza.ims.document.entity;

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
@Table(name = "document_versions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE document_versions SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class DocumentVersion extends BaseEntity {

    @NotNull(message = "Version number is mandatory")
    @Column(name = "version_number", nullable = false)
    private Integer versionNumber;

    @NotBlank(message = "Stored file name is mandatory")
    @Size(max = 255)
    @Column(name = "stored_file_name", nullable = false, length = 255)
    private String storedFileName;

    @NotBlank(message = "Storage path is mandatory")
    @Size(max = 500)
    @Column(name = "storage_path", nullable = false, length = 500)
    private String storagePath;

    @NotBlank(message = "Checksum is mandatory")
    @Size(max = 64)
    @Column(nullable = false, length = 64)
    private String checksum;

    @Column(name = "uploaded_date", nullable = false)
    @Builder.Default
    private LocalDate uploadedDate = LocalDate.now();

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", foreignKey = @ForeignKey(name = "fk_doc_version_user"))
    private User uploadedBy;

    @NotNull(message = "Document is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "document_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_doc_version_document"))
    private Document document;
}

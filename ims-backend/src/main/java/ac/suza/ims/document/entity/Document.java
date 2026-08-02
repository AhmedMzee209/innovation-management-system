package ac.suza.ims.document.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "documents",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_document_code", columnNames = "document_code")
        },
        indexes = {
                @Index(name = "idx_doc_entity", columnList = "entity_type, entity_id"),
                @Index(name = "idx_doc_checksum", columnList = "checksum")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE documents SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Document extends BaseEntity {

    @NotBlank(message = "Document code is mandatory")
    @Size(max = 50)
    @Column(name = "document_code", nullable = false, unique = true, length = 50)
    private String documentCode;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Original file name is mandatory")
    @Size(max = 255)
    @Column(name = "original_file_name", nullable = false, length = 255)
    private String originalFileName;

    @NotBlank(message = "Stored file name is mandatory")
    @Size(max = 255)
    @Column(name = "stored_file_name", nullable = false, length = 255)
    private String storedFileName;

    @NotBlank(message = "Storage path is mandatory")
    @Size(max = 500)
    @Column(name = "storage_path", nullable = false, length = 500)
    private String storagePath;

    @NotBlank(message = "MIME type is mandatory")
    @Size(max = 100)
    @Column(name = "mime_type", nullable = false, length = 100)
    private String mimeType;

    @Size(max = 20)
    @Column(name = "file_extension", length = 20)
    private String fileExtension;

    @NotNull(message = "File size is mandatory")
    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @NotBlank(message = "Checksum is mandatory")
    @Size(max = 64)
    @Column(nullable = false, length = 64)
    private String checksum;

    @Column(name = "version_number", nullable = false)
    @Builder.Default
    private Integer versionNumber = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private DocumentStatus status = DocumentStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private DocumentVisibility visibility = DocumentVisibility.PRIVATE;

    @Column(name = "upload_date", nullable = false)
    @Builder.Default
    private LocalDate uploadDate = LocalDate.now();

    @Column(name = "approved_date")
    private LocalDate approvedDate;

    // Flexible polymorphic entity linkage
    @Size(max = 100)
    @Column(name = "entity_type", length = 100)
    private String entityType;

    @Column(name = "entity_id")
    private UUID entityId;

    // Relationships
    @NotNull(message = "Category is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_document_category"))
    private DocumentCategory category;
}

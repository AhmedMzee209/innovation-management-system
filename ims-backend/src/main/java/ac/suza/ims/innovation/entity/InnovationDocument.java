package ac.suza.ims.innovation.entity;

import ac.suza.ims.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Table(name = "innovation_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE innovation_documents SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class InnovationDocument extends BaseEntity {

    @NotBlank(message = "Document name is mandatory")
    @Size(max = 255)
    @Column(name = "document_name", nullable = false, length = 255)
    private String documentName;

    @NotBlank(message = "Original file name is mandatory")
    @Size(max = 255)
    @Column(name = "original_file_name", nullable = false, length = 255)
    private String originalFileName;

    @Size(max = 100)
    @Column(name = "file_type", length = 100)
    private String fileType;

    @Column(name = "file_size")
    private Long fileSize;

    @NotBlank(message = "Storage path is mandatory")
    @Size(max = 1000)
    @Column(name = "storage_path", nullable = false, length = 1000)
    private String storagePath;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false, length = 50)
    private DocumentType documentType;

    @Column(name = "upload_date", nullable = false)
    @Builder.Default
    private LocalDateTime uploadDate = LocalDateTime.now();

    @NotNull(message = "Innovation is mandatory")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "innovation_id", nullable = false, foreignKey = @ForeignKey(name = "fk_document_innovation"))
    private Innovation innovation;
}

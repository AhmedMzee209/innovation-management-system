package ac.suza.ims.document.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentCommentResponse {

    private UUID id;
    private UUID documentId;
    private String comment;
    private LocalDate createdDate;
    private UUID userId;
    private String userName;
}

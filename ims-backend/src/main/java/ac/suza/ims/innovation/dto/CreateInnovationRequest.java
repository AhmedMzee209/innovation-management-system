package ac.suza.ims.innovation.dto;

import ac.suza.ims.innovation.entity.InnovationLevel;
import ac.suza.ims.innovation.entity.InnovationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CreateInnovationRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255)
    private String title;

    private String abstractText;

    @NotBlank(message = "Problem statement is mandatory")
    private String problemStatement;

    @NotBlank(message = "Proposed solution is mandatory")
    private String proposedSolution;

    private String objectives;
    private String expectedImpact;
    private String targetBeneficiaries;

    @NotNull(message = "Innovation level is mandatory")
    private InnovationLevel innovationLevel;

    @NotNull(message = "Innovation type is mandatory")
    private InnovationType innovationType;

    @NotNull(message = "Category is mandatory")
    private UUID categoryId;

    @NotNull(message = "School is mandatory")
    private UUID schoolId;

    @NotNull(message = "Department is mandatory")
    private UUID departmentId;

    @NotNull(message = "Innovation Hub is mandatory")
    private UUID hubId;
}

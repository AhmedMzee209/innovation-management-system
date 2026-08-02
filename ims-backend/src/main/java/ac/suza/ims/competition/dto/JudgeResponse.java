package ac.suza.ims.competition.dto;

import ac.suza.ims.competition.entity.JudgeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JudgeResponse {

    private UUID id;
    private String judgeCode;
    private UUID userId;
    private String title;
    private String organization;
    private String designation;
    private String specialization;
    private String email;
    private String phone;
    private JudgeStatus status;
}

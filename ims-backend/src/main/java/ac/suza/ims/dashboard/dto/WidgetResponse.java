package ac.suza.ims.dashboard.dto;

import ac.suza.ims.dashboard.entity.ChartType;
import ac.suza.ims.dashboard.entity.WidgetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WidgetResponse {

    private UUID id;
    private String widgetCode;
    private String title;
    private WidgetType widgetType;
    private ChartType chartType;
    private Integer displayOrder;
    private Integer width;
    private Integer height;
    private Integer refreshInterval;
    private Boolean active;
    private Object data;
}

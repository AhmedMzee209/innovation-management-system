package ac.suza.ims.showcase.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "showcase_analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowcaseAnalytics {

    @Id
    @Builder.Default
    private UUID id = UUID.randomUUID();

    @Column(name = "page_views")
    @Builder.Default
    private Long pageViews = 0L;

    @Column(name = "unique_visitors")
    @Builder.Default
    private Long uniqueVisitors = 0L;

    @Builder.Default
    private Long downloads = 0L;

    @Builder.Default
    private Long shares = 0L;

    @Builder.Default
    private Long likes = 0L;

    @Builder.Default
    private Long comments = 0L;

    @Column(name = "analytics_date")
    private LocalDate analyticsDate;
}

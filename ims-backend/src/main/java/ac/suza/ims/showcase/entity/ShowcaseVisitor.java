package ac.suza.ims.showcase.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "showcase_visitors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowcaseVisitor {

    @Id
    @Builder.Default
    private UUID id = UUID.randomUUID();

    @Column(name = "session_id", length = 255)
    private String sessionId;

    @Column(length = 100)
    private String country;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String device;

    @Column(length = 100)
    private String browser;

    @Column(name = "visited_page", length = 500)
    private String visitedPage;

    @Column(name = "visit_date")
    private LocalDateTime visitDate;
}

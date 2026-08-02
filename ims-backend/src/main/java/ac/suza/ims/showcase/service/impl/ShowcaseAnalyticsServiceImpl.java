package ac.suza.ims.showcase.service.impl;

import ac.suza.ims.showcase.entity.ShowcaseVisitor;
import ac.suza.ims.showcase.repository.ShowcaseVisitorRepository;
import ac.suza.ims.showcase.service.ShowcaseAnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShowcaseAnalyticsServiceImpl implements ShowcaseAnalyticsService {

    private final ShowcaseVisitorRepository visitorRepository;

    @Override
    @Transactional
    public void trackVisitor(ShowcaseVisitor visitor) {
        log.info("Tracking anonymous visitor to showcase page: {}", visitor.getVisitedPage());
        visitorRepository.save(visitor);
    }
}

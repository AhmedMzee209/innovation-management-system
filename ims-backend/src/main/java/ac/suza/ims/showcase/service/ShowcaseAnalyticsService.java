package ac.suza.ims.showcase.service;

import ac.suza.ims.showcase.entity.ShowcaseVisitor;

public interface ShowcaseAnalyticsService {
    void trackVisitor(ShowcaseVisitor visitor);
}

package com.shubham.url_shortner.kafka;

import com.shubham.url_shortner.dtos.ClickEvent;
import com.shubham.url_shortner.entity.ClickAnalytics;
import com.shubham.url_shortner.repositories.ClickAnalyticsRepo;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    private final ClickAnalyticsRepo clickAnalyticsRepo;

    KafkaConsumer(ClickAnalyticsRepo clickAnalyticsRepo){
        this.clickAnalyticsRepo=clickAnalyticsRepo;
    }

    @KafkaListener(
            topics = "url-clicks",
            groupId = "analytics-group"
    )
    public void consume(ClickEvent event) {

        ClickAnalytics analytics = new ClickAnalytics();

        analytics.setEventId(event.getEventId());
        analytics.setShortCode(event.getShortCode());
        analytics.setTimestamp(event.getTimestamp());
        analytics.setIpAddress(event.getIpAddress());
        analytics.setUserAgent(event.getUserAgent());
        analytics.setReferrer(event.getReferrer());

        clickAnalyticsRepo.save(analytics);
    }
}
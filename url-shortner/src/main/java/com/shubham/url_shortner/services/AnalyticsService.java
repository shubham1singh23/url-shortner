package com.shubham.url_shortner.services;

import com.shubham.url_shortner.dtos.AnalyticsResponse;
import com.shubham.url_shortner.repositories.ClickAnalyticsRepo;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final ClickAnalyticsRepo analyticsRepo;

    public AnalyticsService(
            ClickAnalyticsRepo analyticsRepo) {

        this.analyticsRepo = analyticsRepo;
    }

    public AnalyticsResponse getAnalytics(
            String shortCode) {

        long totalClicks =
                analyticsRepo.countByShortCode(shortCode);

        return new AnalyticsResponse(
                shortCode,
                totalClicks
        );
    }
}
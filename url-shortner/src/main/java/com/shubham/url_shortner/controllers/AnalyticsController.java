package com.shubham.url_shortner.controllers;

import com.shubham.url_shortner.dtos.AnalyticsResponse;
import com.shubham.url_shortner.services.AnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(
            AnalyticsService analyticsService) {

        this.analyticsService = analyticsService;
    }

    @GetMapping("/{shortCode}")
    public AnalyticsResponse getAnalytics(
            @PathVariable String shortCode) {

        return analyticsService.getAnalytics(shortCode);
    }
}
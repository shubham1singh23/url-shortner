package com.shubham.url_shortner.repositories;

import com.shubham.url_shortner.entity.ClickAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClickAnalyticsRepo
        extends JpaRepository<ClickAnalytics, String> {

    long countByShortCode(String shortCode);

    List<ClickAnalytics> findByShortCode(String shortCode);
}
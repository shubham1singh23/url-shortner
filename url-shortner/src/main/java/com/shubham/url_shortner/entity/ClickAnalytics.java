package com.shubham.url_shortner.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "click_analytics")
public class ClickAnalytics {

    @Id
    private String eventId;

    private String shortCode;

    private LocalDateTime timestamp;

    private String ipAddress;

    private String userAgent;

    private String referrer;
}
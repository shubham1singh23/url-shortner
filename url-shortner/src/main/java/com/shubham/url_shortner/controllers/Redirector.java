package com.shubham.url_shortner.controllers;

import com.shubham.url_shortner.dtos.ClickEvent;
import com.shubham.url_shortner.kafka.KafkaProducer;
import com.shubham.url_shortner.services.RateLimiterService;
import com.shubham.url_shortner.services.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/redirect/")
public class Redirector {


    UrlService urlService;
    RateLimiterService rateLimiterService;
    private final KafkaProducer kafkaProducer;

    Redirector(UrlService urlService,RateLimiterService rateLimiterService,KafkaProducer kafkaProducer){
        this.rateLimiterService=rateLimiterService;
        this.urlService=urlService;
        this.kafkaProducer=kafkaProducer;
    }

    @GetMapping("/{shortCode}")
    public RedirectView redirect(@PathVariable String shortCode, HttpServletRequest httpServletRequest){
        String ipAddress=httpServletRequest.getRemoteAddr();

        if(!rateLimiterService.isAllowed(ipAddress)){
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "Too many requests. Try again later." );
        }

        ClickEvent event = new ClickEvent(
                UUID.randomUUID().toString(),
                shortCode,
                LocalDateTime.now(),
                ipAddress,
                httpServletRequest.getHeader("User-Agent"),
                httpServletRequest.getHeader("Referer")
        );

        kafkaProducer.sendClickEvent(event);

        String actualUrl =urlService.getActualUrl(shortCode);
        return new RedirectView(actualUrl);
    }
}

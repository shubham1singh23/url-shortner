package com.shubham.url_shortner.services;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimiterService {

    StringRedisTemplate redisTemplate;

    private static final int MAX_REQUESTS = 2;
    private static final Duration WINDOW = Duration.ofMinutes(1);

    RateLimiterService(StringRedisTemplate redisTemplate){
        this.redisTemplate=redisTemplate;
    }

    public boolean isAllowed(String ipAddress){
        String key="rate:limiter:"+ipAddress;

        Long count=redisTemplate.opsForValue().increment(key);

        if(count==1){
            redisTemplate.expire(key,WINDOW);
        }

        return count<=MAX_REQUESTS;


    }
}

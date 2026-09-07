package com.shubham.url_shortner.kafka;


import com.shubham.url_shortner.dtos.ClickEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

    private static final String  TOPIC="url-clicks";


    private final KafkaTemplate<String,ClickEvent> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String,ClickEvent> kafkaTemplate){
        this.kafkaTemplate=kafkaTemplate;
    }

    public void sendClickEvent(ClickEvent clickEvent){
        kafkaTemplate.send(
                TOPIC,
                clickEvent.getShortCode(),
                clickEvent
        );
    }
}

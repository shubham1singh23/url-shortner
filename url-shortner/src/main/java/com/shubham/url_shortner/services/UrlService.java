package com.shubham.url_shortner.services;

import com.shubham.url_shortner.entity.Url;
import com.shubham.url_shortner.repositories.UrlRepo;
import com.shubham.url_shortner.utils.ShortCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UrlService {

    @Autowired
    UrlRepo urlRepo;

    public String saveUrl(String actualUrl) {

        if (!actualUrl.startsWith("http://") &&
                !actualUrl.startsWith("https://")) {

            actualUrl = "https://" + actualUrl;
        }


        Url url=new Url();
        url.setUrl(actualUrl);

        String code;
        do{
            code=ShortCodeGenerator.generateCode();
        }while(urlRepo.existsByShortCode(code));

        url.setShortCode(code);
        urlRepo.save(url);
        return code;

    }

    @Cacheable(value="urls", key="#shortCode")
    public String getActualUrl(String shortCode) {
        System.out.println("fetching url from database");
        Url url=urlRepo.findByShortCode(shortCode).orElseThrow(()->new RuntimeException("Short Code not found "+shortCode));
        return url.getUrl();
    }
}

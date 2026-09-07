package com.shubham.url_shortner.controllers;


import com.shubham.url_shortner.dtos.SaveDto;
import com.shubham.url_shortner.dtos.SaveResponseDto;
import com.shubham.url_shortner.entity.Url;
import com.shubham.url_shortner.services.UrlService;
import com.shubham.url_shortner.utils.ShortCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class UrlController {

    @Autowired
    UrlService urlService;

    @PostMapping("/save")
    SaveResponseDto saveUrl(@RequestBody SaveDto saveDto){

        String code=urlService.saveUrl(saveDto.getUrl());
        return new SaveResponseDto(saveDto.getUrl(),code);
    }
}

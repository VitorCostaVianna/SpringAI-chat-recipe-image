package com.vitor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vitor.service.ChatService;

@RestController
public class GenerativeAIController {
    
    private final ChatService service;

    public GenerativeAIController(ChatService service) {
        this.service = service;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return service.getResponse(prompt);
    }
}

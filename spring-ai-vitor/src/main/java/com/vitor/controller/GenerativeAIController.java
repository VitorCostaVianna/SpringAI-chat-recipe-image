package com.vitor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vitor.service.ChatService;
import com.vitor.service.RecipeService;

@RestController
public class GenerativeAIController {
    
    private final ChatService chatService;

    private final RecipeService recipeService;

    public GenerativeAIController(ChatService chatService,
                                  RecipeService recipeService) {
        this.chatService = chatService;
        this.recipeService = recipeService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseWithOptions(@RequestParam String prompt){
        return chatService.getResponseWithOptions(prompt);
    }

    @GetMapping("recipe-creator")
    public String recipeCreator(@RequestParam String ingredients, 
                                @RequestParam(defaultValue = "any") String cuisine, 
                                @RequestParam(defaultValue = "none") String dietaryRestrictions){
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }
    
}

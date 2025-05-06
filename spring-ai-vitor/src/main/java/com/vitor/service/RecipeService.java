package com.vitor.service;

import java.util.Map;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    
    private final ChatModel chatModel;

    public RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createRecipe(String ingredients, 
                               String cuisine, 
                               String dietaryRestrictions){
        var template = """
                I want to create a recipe using the following ingredients: {ingredients}
                The cuisine type I prefer is {cuisine}.
                Please consider the followwing dietary restrictions: {dietaryRestrictions}.
                Please provide mee with a detailed recipe including tittle , list of ingredients and cook instructions
                """;
        PromptTemplate promptTemplate = new PromptTemplate(template);
        Map<String, Object> params = Map.of(
            "ingredients", ingredients,
            "cuisine", cuisine,
            "dietaryRestrictions", dietaryRestrictions
        );

        Prompt prompt = promptTemplate.create(params); // set variable values
        
        return chatModel.call(prompt).getResult().getOutput().getText();
    }

}

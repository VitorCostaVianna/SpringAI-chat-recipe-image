package com.vitor.controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vitor.dto.ChatResponseDto;
import com.vitor.dto.ImageResponseDto;
import com.vitor.dto.RecipeResponseDto;
import com.vitor.dto.TranscriptionResponseDto;
import com.vitor.service.ChatService;
import com.vitor.service.ImageService;
import com.vitor.service.RecipeService;
import com.vitor.service.TranscriptionService;

@RestController
@RequestMapping("ai")
public class GenerativeAIController {

    private final ChatService chatService;
    private final RecipeService recipeService;
    private final ImageService imageService;
    private final TranscriptionService transcriptionService;

    public GenerativeAIController(ChatService chatService,
            RecipeService recipeService,
            ImageService imageService,
            TranscriptionService transcriptionService) {
        this.chatService = chatService;
        this.recipeService = recipeService;
        this.imageService = imageService;
        this.transcriptionService = transcriptionService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public ChatResponseDto getResponseWithOptions(@RequestParam String prompt) {
        String response = chatService.getResponseWithOptions(prompt);
        return new ChatResponseDto(response, "llama-3.3-70b-versatile");
    }

    @GetMapping("recipe-creator")
    public RecipeResponseDto recipeCreator(@RequestParam String ingredients,
            @RequestParam(defaultValue = "any") String cuisine,
            @RequestParam(defaultValue = "none") String dietaryRestrictions) {
        String recipe = recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
        return new RecipeResponseDto(recipe, cuisine, dietaryRestrictions);
    }

    @GetMapping("generate-image")
    public ImageResponseDto generateImage(@RequestParam String prompt,
            @RequestParam(defaultValue = "hd") String quality,
            @RequestParam(defaultValue = "1") Integer n,
            @RequestParam(defaultValue = "1024") Integer height,
            @RequestParam(defaultValue = "1024") Integer width) {
        return imageService.generateImage(prompt, quality, n, height, width);
    }

    @PostMapping(value = "transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TranscriptionResponseDto transcribeAudio(@RequestParam("file") MultipartFile file) throws IOException {
        return transcriptionService.transcribeAudio(file);
    }
}

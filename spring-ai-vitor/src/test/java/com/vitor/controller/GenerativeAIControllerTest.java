package com.vitor.controller;

import com.vitor.service.ChatService;
import com.vitor.service.ImageService;
import com.vitor.service.RecipeService;
import com.vitor.service.TranscriptionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GenerativeAIController.class)
class GenerativeAIControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ChatService chatService;

    @MockitoBean
    private RecipeService recipeService;

    @MockitoBean
    private ImageService imageService;

    @MockitoBean
    private TranscriptionService transcriptionService;

    @Test
    void askAi_ShouldReturnOk_WhenPromptIsValid() throws Exception {
        // Arrange
        when(chatService.getResponseWithOptions(anyString())).thenReturn("Mocked AI Response");

        // Act & Assert
        mockMvc.perform(get("/ai/ask-ai-options")
                .param("prompt", "Hello World")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").value("Mocked AI Response"))
                .andExpect(jsonPath("$.modelName").value("llama-3.3-70b-versatile"));
    }

    @Test
    void askAi_ShouldReturnBadRequest_WhenPromptIsBlank() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/ai/ask-ai")
                .param("prompt", "")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Failed"));
    }
}

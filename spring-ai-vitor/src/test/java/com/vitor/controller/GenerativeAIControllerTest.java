package com.vitor.controller;

import com.vitor.dto.ChatResponseDto;
import com.vitor.service.ChatService;
import com.vitor.service.ImageService;
import com.vitor.service.RecipeService;
import com.vitor.service.TranscriptionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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

    @MockBean
    private ChatService chatService;

    @MockBean
    private RecipeService recipeService;

    @MockBean
    private ImageService imageService;

    @MockBean
    private TranscriptionService transcriptionService;

    @Test
    void askAi_ShouldReturnOk_WhenPromptIsValid() throws Exception {
        // Arrange
        ChatResponseDto mockResponse = new ChatResponseDto("Mocked AI Response", "gpt-3.5-turbo");
        when(chatService.getResponse(anyString())).thenReturn(mockResponse);

        // Act & Assert
        mockMvc.perform(get("/ai/ask-ai")
                .param("prompt", "Hello World")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").value("Mocked AI Response"))
                .andExpect(jsonPath("$.modelName").value("gpt-3.5-turbo"));
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

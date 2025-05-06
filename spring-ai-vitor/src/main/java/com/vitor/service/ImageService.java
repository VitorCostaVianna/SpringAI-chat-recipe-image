package com.vitor.service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    
    private final OpenAiImageModel imageModel;

    public ImageService(OpenAiImageModel openaiImageModel) {
        imageModel = openaiImageModel;
    }

    public ImageResponse generateImage(String prompt,
                                       String quality,
                                       Integer n,
                                       Integer height, Integer width
                                       ){
        ImageResponse imageResponse = imageModel.call(
            new ImagePrompt(prompt,
                OpenAiImageOptions.builder()
                    .quality(quality)
                    .N(n) // image quantity 
                    .height(height)
                    .width(width).build())
        );
        return imageResponse;
    }
    
}

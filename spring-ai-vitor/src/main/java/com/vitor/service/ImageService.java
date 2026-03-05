package com.vitor.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.vitor.dto.ImageResponseDto;

/**
 * Uses Pollinations.ai — a completely free, no-API-key image generation
 * service.
 * Generates images via a simple URL pattern:
 * https://image.pollinations.ai/prompt/{encoded-prompt}
 */
@Service
public class ImageService {

    private static final Logger log = LoggerFactory.getLogger(ImageService.class);
    private static final String POLLINATIONS_BASE = "https://image.pollinations.ai/prompt/";

    public ImageResponseDto generateImage(String prompt,
            String quality,
            Integer n,
            Integer height,
            Integer width) {

        log.info("Generating {} image(s) via Pollinations.ai for prompt: {}", n, prompt);

        String encodedPrompt = URLEncoder.encode(prompt, StandardCharsets.UTF_8);
        String resolution = width + "x" + height;
        List<String> imageUrls = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            // Adding a seed based on index so each image is unique
            String url = POLLINATIONS_BASE + encodedPrompt
                    + "?width=" + width
                    + "&height=" + height
                    + "&seed=" + (System.currentTimeMillis() + i)
                    + "&model=flux" // Flux model — high quality, free
                    + "&nologo=true";
            imageUrls.add(url);
        }

        return new ImageResponseDto(imageUrls, resolution, n);
    }
}

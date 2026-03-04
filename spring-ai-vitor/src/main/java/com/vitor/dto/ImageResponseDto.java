package com.vitor.dto;

import java.util.List;

public record ImageResponseDto(
    List<String> imageUrls,
    String resolution,
    int numberOfImages
) {
}

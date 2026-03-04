package com.vitor.dto;

public record RecipeResponseDto(
    String recipe,
    String cuisine,
    String dietaryRestrictions
) {
}

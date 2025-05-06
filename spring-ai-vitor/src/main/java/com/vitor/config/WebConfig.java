package com.vitor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer(){

            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:8080/" , "http://localhost:3000")
                    .allowedMethods("GET", "POST" , "DELETE" , "PUT", "OPTIONS") // options for react or aangular 
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }

}

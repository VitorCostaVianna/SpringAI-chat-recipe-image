package com.vitor.service;

import java.io.File;
import java.io.IOException;

import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.vitor.dto.TranscriptionResponseDto;

@Service
public class TranscriptionService {

    private static final Logger log = LoggerFactory.getLogger(TranscriptionService.class);

    private final OpenAiAudioTranscriptionModel transcriptionModel;

    public TranscriptionService(@Value("${groq.api-key}") String apiKey) {
        // Groq provides an OpenAI-compatible audio API — just point to their base URL
        OpenAiAudioApi groqAudioApi = OpenAiAudioApi.builder()
                .apiKey(apiKey)
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
        this.transcriptionModel = new OpenAiAudioTranscriptionModel(groqAudioApi);
    }

    public TranscriptionResponseDto transcribeAudio(MultipartFile file) throws IOException {
        log.info("Transcribing audio file: {}", file.getOriginalFilename());
        File tempFile = File.createTempFile("audio", ".mp3");
        file.transferTo(tempFile);

        OpenAiAudioTranscriptionOptions transcriptionOptions = OpenAiAudioTranscriptionOptions.builder()
                .model("whisper-large-v3") // Groq's free Whisper model
                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                .language("pt")
                .temperature(0f)
                .build();

        FileSystemResource audioFile = new FileSystemResource(tempFile);
        AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(audioFile, transcriptionOptions);
        AudioTranscriptionResponse response = transcriptionModel.call(transcriptionRequest);

        tempFile.delete();

        return new TranscriptionResponseDto(response.getResult().getOutput(), file.getOriginalFilename());
    }
}

package com.bhavani.trading.controller;

import com.bhavani.trading.dto.ApiResponse;
import com.bhavani.trading.model.Inquiry;
import com.bhavani.trading.repository.InquiryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryRepository inquiryRepository;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<ApiResponse<Inquiry>> submitInquiry(@Valid @RequestBody InquiryRequest request) {
        Inquiry inquiry = Inquiry.builder()
            .name(request.getName())
            .email(request.getEmail())
            .phone(request.getPhone())
            .company(request.getCompany())
            .message(request.getMessage())
            .type(Inquiry.Type.GENERAL)
            .status(Inquiry.Status.PENDING)
            .build();

        return ResponseEntity.ok(ApiResponse.success(
            "Inquiry submitted successfully",
            inquiryRepository.save(inquiry)
        ));
    }

    @PostMapping(value = "/quote", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Inquiry>> submitQuote(
        @RequestParam("data") String dataJson,
        @RequestParam(value = "file", required = false) MultipartFile file
    ) throws Exception {
        QuoteRequest request = objectMapper.readValue(dataJson, QuoteRequest.class);

        String filePath = null;
        if (file != null && !file.isEmpty()) {
            filePath = saveFile(file);
        }

        Inquiry inquiry = Inquiry.builder()
            .name(request.getName())
            .email(request.getEmail())
            .phone(request.getPhone())
            .company(request.getCompany())
            .deliveryAddress(request.getDeliveryAddress())
            .itemsJson(objectMapper.writeValueAsString(request.getItems()))
            .additionalNotes(request.getAdditionalNotes())
            .requirementFilePath(filePath)
            .type(Inquiry.Type.QUOTE)
            .status(Inquiry.Status.PENDING)
            .build();

        return ResponseEntity.ok(ApiResponse.success(
            "Quote request submitted successfully",
            inquiryRepository.save(inquiry)
        ));
    }

    private String saveFile(MultipartFile file) throws IOException {
        String uploadDir = System.getProperty("app.upload.dir", "./uploads");
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);
        return filename;
    }

    @Data
    public static class InquiryRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String phone;
        private String company;
        @NotBlank @Size(min = 10) private String message;
    }

    @Data
    public static class QuoteRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String phone;
        private String company;
        private String deliveryAddress;
        private Object items;
        private String additionalNotes;
    }
}

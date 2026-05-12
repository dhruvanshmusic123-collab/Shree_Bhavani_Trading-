package com.bhavani.trading.controller;

import com.bhavani.trading.dto.ApiResponse;
import com.bhavani.trading.model.Brand;
import com.bhavani.trading.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Brand>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
            brandRepository.findByIsActiveTrueOrderByNameAsc()
        ));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Brand>> getBySlug(@PathVariable String slug) {
        return brandRepository.findBySlug(slug)
            .map(b -> ResponseEntity.ok(ApiResponse.success(b)))
            .orElse(ResponseEntity.notFound().build());
    }
}

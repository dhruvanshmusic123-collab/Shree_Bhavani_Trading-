package com.bhavani.trading.controller;

import com.bhavani.trading.dto.ApiResponse;
import com.bhavani.trading.model.Category;
import com.bhavani.trading.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
            categoryRepository.findByIsActiveTrueOrderBySortOrderAsc()
        ));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Category>> getBySlug(@PathVariable String slug) {
        return categoryRepository.findBySlug(slug)
            .map(c -> ResponseEntity.ok(ApiResponse.success(c)))
            .orElse(ResponseEntity.notFound().build());
    }
}

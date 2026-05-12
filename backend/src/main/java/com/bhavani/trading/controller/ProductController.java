package com.bhavani.trading.controller;

import com.bhavani.trading.dto.ApiResponse;
import com.bhavani.trading.model.Product;
import com.bhavani.trading.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<Page<Product>> getAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "24") int size,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String categorySlug,
        @RequestParam(required = false) String brandSlug,
        @RequestParam(required = false) String material,
        @RequestParam(defaultValue = "createdAt,desc") String sort
    ) {
        String[] sortParts = sort.split(",");
        Sort.Direction dir = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("asc")
            ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, Math.min(size, 50), Sort.by(dir, sortParts[0]));

        Page<Product> result = productRepository.searchProducts(
            (search != null && !search.isBlank()) ? search : null,
            (categorySlug != null && !categorySlug.isBlank()) ? categorySlug : null,
            (brandSlug != null && !brandSlug.isBlank()) ? brandSlug : null,
            (material != null && !material.isBlank()) ? material : null,
            pageable
        );

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Product>> getBySlug(@PathVariable String slug) {
        return productRepository.findBySlugAndIsActiveTrue(slug)
            .map(p -> ResponseEntity.ok(ApiResponse.success(p)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Product>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.success(
            productRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc()
        ));
    }

    @GetMapping("/category/{categorySlug}")
    public ResponseEntity<Page<Product>> getByCategory(
        @PathVariable String categorySlug,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "24") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(
            productRepository.findByCategorySlugAndIsActiveTrue(categorySlug, pageable)
        );
    }

    @GetMapping("/{slug}/related")
    public ResponseEntity<ApiResponse<List<Product>>> getRelated(@PathVariable String slug) {
        return productRepository.findBySlugAndIsActiveTrue(slug)
            .map(p -> ResponseEntity.ok(ApiResponse.success(
                productRepository.findTop6ByCategorySlugAndIsActiveTrueAndSlugNot(
                    p.getCategory().getSlug(), slug
                )
            )))
            .orElse(ResponseEntity.ok(ApiResponse.success(List.of())));
    }
}

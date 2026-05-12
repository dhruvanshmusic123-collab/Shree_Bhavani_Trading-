package com.bhavani.trading.controller;

import com.bhavani.trading.dto.ApiResponse;
import com.bhavani.trading.model.*;
import com.bhavani.trading.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AdminController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final InquiryRepository inquiryRepository;
    private final ObjectMapper objectMapper;

    // ── Dashboard ──

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        long today = inquiryRepository.countSince(
            LocalDate.now().atStartOfDay()
        );
        return ResponseEntity.ok(ApiResponse.success(Map.of(
            "totalProducts", productRepository.count(),
            "totalCategories", categoryRepository.count(),
            "totalBrands", brandRepository.count(),
            "totalInquiries", inquiryRepository.count(),
            "pendingInquiries", inquiryRepository.countByStatus(Inquiry.Status.PENDING),
            "newInquiriesToday", today,
            "featuredProducts", productRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc().size()
        )));
    }

    @GetMapping("/dashboard/recent-inquiries")
    public ResponseEntity<ApiResponse<Page<Inquiry>>> getRecentInquiries() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(ApiResponse.success(inquiryRepository.findAll(pageable)));
    }

    // ── Products ──

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAdminProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(productRepository.findAll(pageable));
    }

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Product>> createProduct(
        @RequestParam("data") String dataJson,
        @RequestParam(value = "images", required = false) MultipartFile[] images
    ) throws Exception {
        ProductRequest request = objectMapper.readValue(dataJson, ProductRequest.class);
        // Build and save product (simplified)
        Product product = new Product();
        product.setName(request.name);
        product.setSlug(request.slug);
        product.setDescription(request.description);
        product.setShortDescription(request.shortDescription);
        product.setMaterial(request.material);
        product.setApplication(request.application);
        product.setFeatured(request.isFeatured);
        product.setActive(true);
        if (request.categoryId != null) {
            categoryRepository.findById(request.categoryId).ifPresent(product::setCategory);
        }
        if (request.brandId != null) {
            brandRepository.findById(request.brandId).ifPresent(product::setBrand);
        }
        if (request.specificationsJson != null) {
            product.setSpecificationsJson(request.specificationsJson);
        }
        if (request.availableSizesJson != null) {
            product.setAvailableSizesJson(request.availableSizesJson);
        }
        return ResponseEntity.ok(ApiResponse.success("Product created", productRepository.save(product)));
    }

    @PutMapping(value = "/products/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Product>> updateProduct(
        @PathVariable Long id,
        @RequestParam("data") String dataJson
    ) throws Exception {
        ProductRequest request = objectMapper.readValue(dataJson, ProductRequest.class);
        return productRepository.findById(id)
            .map(p -> {
                if (request.name != null) p.setName(request.name);
                if (request.description != null) p.setDescription(request.description);
                if (request.shortDescription != null) p.setShortDescription(request.shortDescription);
                if (request.material != null) p.setMaterial(request.material);
                if (request.application != null) p.setApplication(request.application);
                p.setFeatured(request.isFeatured);
                if (request.categoryId != null)
                    categoryRepository.findById(request.categoryId).ifPresent(p::setCategory);
                if (request.brandId != null)
                    brandRepository.findById(request.brandId).ifPresent(p::setBrand);
                if (request.specificationsJson != null) p.setSpecificationsJson(request.specificationsJson);
                if (request.availableSizesJson != null) p.setAvailableSizesJson(request.availableSizesJson);
                return ResponseEntity.ok(ApiResponse.success("Updated", productRepository.save(p)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted", null));
    }

    @PatchMapping("/products/{id}/featured")
    public ResponseEntity<ApiResponse<Product>> toggleFeatured(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(p -> {
                p.setFeatured(!p.isFeatured());
                return ResponseEntity.ok(ApiResponse.success(productRepository.save(p)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/products/{id}/active")
    public ResponseEntity<ApiResponse<Product>> toggleActive(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(p -> {
                p.setActive(!p.isActive());
                return ResponseEntity.ok(ApiResponse.success(productRepository.save(p)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ── Categories ──

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<?>> getAdminCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryRepository.findAll()));
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(ApiResponse.success(categoryRepository.save(category)));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
        @PathVariable Long id, @RequestBody Category update
    ) {
        return categoryRepository.findById(id)
            .map(c -> {
                c.setName(update.getName());
                c.setDescription(update.getDescription());
                c.setIcon(update.getIcon());
                c.setSortOrder(update.getSortOrder());
                c.setActive(update.isActive());
                return ResponseEntity.ok(ApiResponse.success(categoryRepository.save(c)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }

    // ── Inquiries ──

    @GetMapping("/inquiries")
    public ResponseEntity<Page<Inquiry>> getInquiries(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) String status
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (status != null) {
            return ResponseEntity.ok(inquiryRepository.findByStatus(Inquiry.Status.valueOf(status), pageable));
        }
        return ResponseEntity.ok(inquiryRepository.findAll(pageable));
    }

    @GetMapping("/inquiries/{id}")
    public ResponseEntity<ApiResponse<Inquiry>> getInquiry(@PathVariable Long id) {
        return inquiryRepository.findById(id)
            .map(i -> ResponseEntity.ok(ApiResponse.success(i)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/inquiries/{id}/status")
    public ResponseEntity<ApiResponse<Inquiry>> updateInquiryStatus(
        @PathVariable Long id,
        @RequestBody Map<String, String> body
    ) {
        return inquiryRepository.findById(id)
            .map(i -> {
                i.setStatus(Inquiry.Status.valueOf(body.get("status")));
                return ResponseEntity.ok(ApiResponse.success(inquiryRepository.save(i)));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInquiry(@PathVariable Long id) {
        inquiryRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }

    @Data
    public static class ProductRequest {
        public String name;
        public String slug;
        public String description;
        public String shortDescription;
        public Long categoryId;
        public Long brandId;
        public String material;
        public String application;
        public boolean isFeatured;
        public String specificationsJson;
        public String availableSizesJson;
    }
}

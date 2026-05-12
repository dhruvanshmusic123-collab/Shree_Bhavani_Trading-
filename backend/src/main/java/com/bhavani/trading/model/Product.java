package com.bhavani.trading.model;

import com.bhavani.trading.dto.SpecificationDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_product_slug", columnList = "slug"),
    @Index(name = "idx_product_category", columnList = "category_id"),
    @Index(name = "idx_product_brand", columnList = "brand_id"),
    @Index(name = "idx_product_active", columnList = "is_active"),
})
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 250)
    private String slug;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    // Stored as JSON array of strings
    @Column(name = "images", columnDefinition = "TEXT")
    private String imagesJson;

    // Stored as JSON array of {label, value}
    @Column(name = "specifications", columnDefinition = "TEXT")
    private String specificationsJson;

    // Stored as JSON array of strings
    @Column(name = "available_sizes", columnDefinition = "TEXT")
    private String availableSizesJson;

    @Column(length = 100)
    private String material;

    @Column(length = 200)
    private String application;

    @Column(name = "is_featured")
    private boolean isFeatured = false;

    @Column(name = "is_active")
    private boolean isActive = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Transient
    public List<String> getImages() {
        try {
            if (imagesJson == null || imagesJson.isBlank()) return new ArrayList<>();
            return objectMapper.readValue(imagesJson, new TypeReference<>() {});
        } catch (Exception e) { return new ArrayList<>(); }
    }

    @Transient
    public List<SpecificationDto> getSpecifications() {
        try {
            if (specificationsJson == null || specificationsJson.isBlank()) return new ArrayList<>();
            return objectMapper.readValue(specificationsJson, new TypeReference<>() {});
        } catch (Exception e) { return new ArrayList<>(); }
    }

    @Transient
    public List<String> getAvailableSizes() {
        try {
            if (availableSizesJson == null || availableSizesJson.isBlank()) return new ArrayList<>();
            return objectMapper.readValue(availableSizesJson, new TypeReference<>() {});
        } catch (Exception e) { return new ArrayList<>(); }
    }
}

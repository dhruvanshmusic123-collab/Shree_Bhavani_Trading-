package com.bhavani.trading.repository;

import com.bhavani.trading.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlugAndIsActiveTrue(String slug);

    Page<Product> findByIsActiveTrue(Pageable pageable);

    Page<Product> findByCategorySlugAndIsActiveTrue(String categorySlug, Pageable pageable);

    Page<Product> findByBrandSlugAndIsActiveTrue(String brandSlug, Pageable pageable);

    List<Product> findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc();

    @Query("""
        SELECT p FROM Product p
        WHERE p.isActive = true
        AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))
        AND (:categorySlug IS NULL OR p.category.slug = :categorySlug)
        AND (:brandSlug IS NULL OR p.brand.slug = :brandSlug)
        AND (:material IS NULL OR LOWER(p.material) = LOWER(:material))
        """)
    Page<Product> searchProducts(
        @Param("search") String search,
        @Param("categorySlug") String categorySlug,
        @Param("brandSlug") String brandSlug,
        @Param("material") String material,
        Pageable pageable
    );

    List<Product> findTop6ByCategorySlugAndIsActiveTrueAndSlugNot(
        String categorySlug, String slug
    );
}

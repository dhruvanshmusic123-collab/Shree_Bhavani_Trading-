package com.bhavani.trading.config;

import com.bhavani.trading.model.AdminUser;
import com.bhavani.trading.model.Brand;
import com.bhavani.trading.model.Category;
import com.bhavani.trading.repository.AdminUserRepository;
import com.bhavani.trading.repository.BrandRepository;
import com.bhavani.trading.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedCategories();
        seedBrands();
    }

    private void seedAdmin() {
        if (!adminUserRepository.existsByUsername("admin")) {
            AdminUser admin = AdminUser.builder()
                .username("admin")
                .email("bhavanitrading1994@gmail.com")
                .password(passwordEncoder.encode("Bhavani@2024"))
                .role(AdminUser.Role.SUPER_ADMIN)
                .isActive(true)
                .build();
            adminUserRepository.save(admin);
            log.info("Default admin created. Username: admin | Password: Bhavani@2024");
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() > 0) return;
        List<Category> categories = List.of(
            buildCat("UPVC Pipes & Fittings", "upvc-pipes-fittings", "🔧", "High-pressure UPVC pipes for water supply", 1),
            buildCat("CPVC Pipes & Fittings", "cpvc-pipes-fittings", "🌡️", "Hot & cold water CPVC piping systems", 2),
            buildCat("PVC Agri Pipes", "pvc-agri-pipes", "🌾", "Agricultural irrigation PVC pipe solutions", 3),
            buildCat("SWR Pipes & Fittings", "swr-pipes-fittings", "🏗️", "Soil, waste & rainwater drainage", 4),
            buildCat("Underground Drainage", "underground-drainage", "⬇️", "Underground structured wall pipes", 5),
            buildCat("Fire Sprinkler Systems", "fire-sprinkler-systems", "🔥", "Certified fire protection systems", 6),
            buildCat("PP Low Noise Pipes", "pp-low-noise-pipes", "🔇", "Polypropylene low-noise drainage", 7),
            buildCat("PEX Pipes", "pex-pipes", "💧", "Cross-linked polyethylene flexible piping", 8),
            buildCat("Brass Fittings", "brass-fittings", "🔩", "Premium brass pipe fittings", 9),
            buildCat("Ball Valves", "ball-valves", "🚰", "Industrial & domestic ball valves", 10),
            buildCat("Butterfly Valves", "butterfly-valves", "🦋", "Flow control butterfly valves", 11),
            buildCat("Check Valves", "check-valves", "✅", "Non-return check valves", 12),
            buildCat("Plumbing Accessories", "plumbing-accessories", "🔨", "Complete plumbing hardware", 13),
            buildCat("Bathroom Fittings", "bathroom-fittings", "🚿", "Designer bathroom fixtures", 14),
            buildCat("Waterproofing Chemicals", "waterproofing-chemicals", "🧪", "Construction waterproofing", 15),
            buildCat("Adhesives & Sealants", "adhesives-sealants", "🔐", "Industrial adhesives and sealants", 16),
            buildCat("Water Tanks", "water-tanks", "🫙", "Overhead & underground tanks", 17),
            buildCat("Manhole Covers", "manhole-covers", "🔲", "Heavy-duty manhole covers", 18),
            buildCat("Drainage Products", "drainage-products", "🌊", "Channel drains & accessories", 19),
            buildCat("Pipe Clamps", "pipe-clamps", "🔗", "Heavy-duty pipe clamps", 20),
            buildCat("Industrial Valves", "industrial-valves", "⚙️", "Gate, globe & pressure relief valves", 21)
        );
        categoryRepository.saveAll(categories);
        log.info("Seeded {} categories", categories.size());
    }

    private void seedBrands() {
        if (brandRepository.count() > 0) return;
        List<Brand> brands = List.of(
            buildBrand("Supreme", "supreme", "India's leading polymer products manufacturer"),
            buildBrand("Lifeline", "lifeline", "Premium plumbing systems"),
            buildBrand("Aqua Gold", "aqua-gold", "Quality water management solutions"),
            buildBrand("Formcore", "formcore", "Industrial piping solutions"),
            buildBrand("FlameGuard", "flameguard", "Fire protection systems"),
            buildBrand("Serene", "serene", "Sanitary and bathroom solutions"),
            buildBrand("e-Lite", "e-lite", "Modern electrical conduit systems"),
            buildBrand("NeoSeal", "neoseal", "Advanced sealing solutions"),
            buildBrand("Zoloto", "zoloto", "Premium valve manufacturer"),
            buildBrand("RBI", "rbi", "Reliable brass fittings"),
            buildBrand("Indiano", "indiano", "Agricultural piping systems"),
            buildBrand("Somex", "somex", "Drainage solutions"),
            buildBrand("Felice", "felice", "Bathroom accessories"),
            buildBrand("Thor", "thor", "Industrial strength fittings"),
            buildBrand("Dutron", "dutron", "UPVC pipe systems"),
            buildBrand("Simtex", "simtex", "Waterproofing solutions")
        );
        brandRepository.saveAll(brands);
        log.info("Seeded {} brands", brands.size());
    }

    private Category buildCat(String name, String slug, String icon, String desc, int order) {
        return Category.builder()
            .name(name).slug(slug).icon(icon)
            .description(desc).sortOrder(order).isActive(true)
            .build();
    }

    private Brand buildBrand(String name, String slug, String desc) {
        return Brand.builder()
            .name(name).slug(slug)
            .description(desc).isActive(true)
            .build();
    }
}

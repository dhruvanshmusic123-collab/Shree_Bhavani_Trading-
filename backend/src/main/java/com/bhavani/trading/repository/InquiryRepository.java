package com.bhavani.trading.repository;

import com.bhavani.trading.model.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    Page<Inquiry> findAll(Pageable pageable);
    Page<Inquiry> findByStatus(Inquiry.Status status, Pageable pageable);
    long countByStatus(Inquiry.Status status);

    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.createdAt >= :since")
    long countSince(LocalDateTime since);
}

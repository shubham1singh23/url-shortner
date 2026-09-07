package com.shubham.url_shortner.repositories;

import com.shubham.url_shortner.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepo extends JpaRepository<Url,Long> {
    boolean existsByShortCode(String code);

    Optional<Url> findByShortCode(String shortCode);
}
